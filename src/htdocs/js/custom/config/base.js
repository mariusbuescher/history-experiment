( function( window, define, require, undefined ) {
    'use strict';

    define( [
        'app/core',
        'lodash'
    ], function( App, _ ) {

        var moduleOptions = {};

        /**
         * BASE Config
         *
         * Globale config Settings.
         *
         * @module config/base
         * @class App.config
         */

        var config = {
            DEBUG: true,
            modules: [],
            dev: true,

            services: {
                pageData: _.template('/data<%= url %>.json')
            },

            transforms: {
                pageDataTransform: function (url) {
                    url = (url.match(/.html$/)) ? url : (url.match(/\/$/)) ? url + 'index.html' : url + '/index.html';
                    url = url.replace(/.html$/, '');
                    return url;
                }
            },

            set: function( module, options ) {
                moduleOptions[module] = options;
            },

            get: function( module ) {
                return moduleOptions[module];
            }
        };

        $.extend( App, { config: config } );

        return App.config;
    } );

}( this, this.define, this.require ) );
