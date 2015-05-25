( function( window, define, require, undefined ) {
    'use strict';

    define( [
        'app/core',

        'app/loader',
        'app/event_contextual',

        'jquery',
        'lodash',
        'nunjucks',
        'detect!Promise'

        'services/page-data'
    ], function( App, Loader, Event, $, _, nunjucks, Promise, PageDataService ) {

        /**
         * Basic implementation of an owlCarousel
         *
         * @module modules/page-content
         * @requires vendor/nunjucks
         * @fires beforeInit
         * @fires beforeInit:modules/page-content
         * @fires afterInit
         * @fires afterInit:modules/page-content
         */

        return {

            /**
             * The content renderer property
             * @type {Object}
             */
            contentRenderer: null,

            /**
             * The nunjucks environment
             * @type {Object}
             */
            njEnv: null,

            /**
             * The local loader
             * @type {Object}
             */
            loader: null,

            /**
             * Returns default module settings
             * @function
             */
            defaults: function () {
                return {
                    templateUrl: ''
                }
            },

            /**
             * The ready constructo method
             *
             * @function
             * @param  {jQuery} element The element
             * @param  {Object} options The options
             */
            ready: function( element, options ) {
                this.loader = new Loader( {
                    globalScope: App,
                    elementScope: element,
                    autoInitSelector: '.auto-init',
                    autoInit: false
                } );

                this.options = _.extend( this.defaults(), options );

                this.njEnv = new nunjucks.Environment( new nunjucks.WebLoader('/templates') );
            },

            /**
             * Initializes the content renderer
             * @return {Promise} A Promise Object
             */
            initContentRenderer: function () {
                return new Promise(_.bind(function (resolve, reject) {
                    if (this.contentRenderer !== null) {
                        resolve(this.contentRenderer);
                    } else {
                        this.njEnv.getTemplate(this.options.templateUrl, true, _.bind(function (err, tmpl) {
                            this.contentRenderer = tmpl;
                            resolve(this.contentRenderer);
                        }, this ) );
                    }
                }, this));
            },

            /**
             * The events constructor
             *
             * @function
             * @param  {jQuery} element The element
             * @param  {Object} options The options
             */
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
