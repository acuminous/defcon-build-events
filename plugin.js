var dgram = require('dgram');
var _ = require('lodash');
var packageJson = require('./package.json');
var uuid = require('uuid');

module.exports.create = create;

function create(context, next) {

    var plugin = {
        version: packageJson.version,
        description: packageJson.description,
        repositoryUrl: packageJson.repository.url
    }    

    var events = {};

    context.defcon.on('event', function(event) {
        var key = event.system + ':' + event.group;  
        if (events[key] == 'build_failure' && event.type == 'build_success') {
            raise(_.chain(event).clone().extend({ id: uuid.v1(), type: 'build_fixed' }).value());
        };

        if (events[key] == 'build_success' && event.type == 'build_failure') {
            raise(_.chain(event).clone().extend({ id: uuid.v1(), type: 'build_broken' }).value());
        };        
        events[key] = event.type;
    });

    function raise(event) {
        process.nextTick(function() {
            context.defcon.notify('event', event);
        })         
    }

    next(null, plugin);
}

