( function( window, define, require, undefined ) {
    'use strict';

    define( [
        'app/core',

        'app/loader',
        'app/event_contextual',

        'jquery',
        'lodash',
        'nunjucks',

        'services/page-data'
    ], function( App, Loader, Event, $, _, nunjucks, PageDataService ) {

        return {

            contentRenderer: null,
            njEnv: null,
            loader: null,

            ready: function( element, options ) {
                this.loader = new Loader( {
                    globalScope: App,
                    elementScope: element,
                    autoInitSelector: '.auto-init',
                    autoInit: false
                } );

                this.njEnv = new nunjucks.Environment( new nunjucks.WebLoader('/templates') );
            },

            initContentRenderer: function () {
                return new Promise(_.bind(function (resolve, reject) {
                    if (this.contentRenderer !== null) {
                        resolve(this.contentRenderer);
                    } else {
                        this.njEnv.getTemplate('layouts/async-content.njs', true, _.bind(function (err, tmpl) {
                            this.contentRenderer = tmpl;
                            resolve(this.contentRenderer);
                        }, this ) );
                    }
                }, this));
            },

            events: function( element, options ) {
                Event.on('/App/Route/change', _.bind( function (evt, route) {
                    var contentData = null;
                    PageDataService.getData( route ).then(_.bind(function (data) {
                        contentData = data;
                        return this.initContentRenderer();
                    }, this)).then(_.bind(function (tmpl) {
                        tmpl.render(contentData, _.bind(function (err, res) {
                            element.html(res);
                            this.loader.initModules();
                        }, this));
                    }, this));
                }, this ) );
            }
        };
    } );

}( this, this.define, this.require ) );
