( function( window, define, require, requirejs, undefined ) {
    'use strict';

    define( 'app/core', [
        'jquery',
        'lodash',
        'app/loader',
        'app/event_contextual'
    ], function( $, _, Loader, Event ) {

        /**
         * Core Module
         *
         * Is used to load all modules related to DOM Elements
         * All modules are loaded from the app/loader module
         *
         * @module app/core
         */

        /**
         * App object literal
         * @global
         * @type {{}}
         */
        var App = {};

        $.extend( App, {
            /**
             * Initialize core modules
             *
             * @method init
             */
            init: function() {
                this.loader = new Loader( {
                    globalScope: App,
                    autoInitSelector: '.auto-init'
                } );

                this.event = Event;
            }
        } );

        return App;
    } );

} )( this, this.define, this.require, this.requirejs );
