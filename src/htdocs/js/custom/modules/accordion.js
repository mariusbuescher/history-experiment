(function (window, define, require, undefined) {
    'use strict';

    define([
        'jquery',
        'lodash',
        'jqueryui'
    ], function ( $, _ ) {

        return {

            defaults: function () {
                return {
                    collapsible: true
                };
            },

            ready: function ( element, options ) {

                this.options = _.extend(this.defaults(), options);

                element.accordion(this.options);
            }
        }

    });
})(this, this.define, this.require)
