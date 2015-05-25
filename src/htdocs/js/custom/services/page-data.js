( function( window, define, require, requirejs, undefined ) {
    'use strict';

    define([
        'app/core',
        'lodash'
    ], function ( App, _ ) {

        /**
         * Page data service
         *
         * A service that only cares for fetching JSON-Data for single page applications.
         *
         * @class
         * @classdesc Page data service class
         */

        /**
         * Constructor
         *
         * @constructs PageDataService
         * @returns {
         *    {
         *      currentRoute: null,
         *      currentData: null,
         *      currentRequest: null
         *    }
         * }
         */
        var PageDataService = function () {
            this.currentRoute   = null;
            this.currentData    = null;
            this.currentRequest = null;

            return this;
        };

        /**
         * Gets the URL for the given url
         * @param  {String} url The current route/url
         * @return {String}     The transformed URL
         */
        PageDataService.prototype.getDataUrl = function (url) {
            url = App.config.transforms.pageDataTransform(url);
            url = App.config.services.pageData({ url : url });
            return url;
        };

        /**
         * Gets the Data for a given route
         * @param  {String} route The route
         * @return {Promise}      Promise when the data is fetched
         */
        PageDataService.prototype.getData = function (route) {
            return new Promise(_.bind(function (resolve, reject) {

                if (this.currentRoute !== route) {

                    var url = this.getDataUrl(route);
                    var startRequest = false;

                    if (this.currentRequest === null ) {
                        this.currentRequest = new XMLHttpRequest();
                        startRequest = true;
                    }

                    this.currentRequest.addEventListener('load', _.bind(function (xhr) {
                        this.currentRoute = route;
                        this.currentData = JSON.parse(xhr.currentTarget.responseText);
                        this.currentRequest = null;
                        resolve(this.currentData);
                    }, this));

                    if (startRequest === true) {
                        this.currentRequest.open('get', url, true);
                        this.currentRequest.send();
                    }
                } else {
                    resolve(this.currentData);
                }
            }, this));
        };

        return new PageDataService();

    });

} )( this, this.define, this.require, this.requirejs );
