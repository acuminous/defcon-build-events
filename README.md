# DEFCON Build Events Plugin

Watches an application/group for "build_success" and "build_failure" events.
If a "build_success" follows a "build_failure" an addition "build_fixed" is triggered.
If a "build_failure" follows a "build_success" an additional "build_broken" is triggered.

## Prerequisits
1. [DEFCON](http://github.com/acuminous/defcon)

## Installation
1. '''cd $DEFCON_INSTALL_DIR'''
2. '''npm install defcon-build-events'''
3. Restart defcon (you can do this via '''kill -s USRSIG2 <pid>''' if you want zero downtime)

## Configuration
This plugin requires no configuration