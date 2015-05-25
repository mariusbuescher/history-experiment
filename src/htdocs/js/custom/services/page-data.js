( function( window, define, require, requirejs, undefined ) {
    'use strict';

    define(['lodash'], function ( _ ) {

        var PageDataService = function () {
            this.currentRoute   = null;
            this.currentData    = null;
            this.currentRequest = null;
        };

         PageDataService.prototype.getDataUrl = function (url) {
            url = (url.match(/.html$/)) ? url : (url.match(/\/$/)) ? url + 'index.html' : url + '/index.html';
            url = url.replace(/.html$/, '.json');
            url = '/data' + url;
            return url;
        };

        PageDataService.prototype.getData = function (route) {
            return new Promise(_.bind(function (resolve, reject) {

                if (this.currentRoute !== route) {

                    var url = this.getDataUrl(route);

                    if (this.currentRequest === null ) {
                        this.currentRequest = new XMLHttpRequest();
                    }

                    this.currentRequest.addEventListener('load', _.bind(function (xhr) {
                        this.currentRoute = route;
                        this.currentData = JSON.parse(xhr.currentTarget.responseText);
                        this.currentRequest = null;
                        resolve(this.currentData);
                    }, this));

                    this.currentRequest.open('get', url, true);
                    this.currentRequest.send();
                } else {
                    resolve(this.currentData);
                }
            }, this));
        };

        return new PageDataService();

    });

} )( this, this.define, this.require, this.requirejs );
