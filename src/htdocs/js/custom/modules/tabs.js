(function (window, define, require, undefined) {
    'use strict';

    define([
        'jquery',
        'jqueryui'
    ], function ( $ ) {

        return {
            ready: function ( element, options ) {
                element.tabs();
            }
        }

    });
})(this, this.define, this.require)
