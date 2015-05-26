( function( window, define, require, requirejs, undefined ) {

    define(['lodash', 'app/event_contextual'], function ( _, events ) {

        /**
         * Router
         *
         * A Router for Single Page Applications fireing an event on route change
         *
         * @class
         * @classdesc Router class
         */

        /**
         * Constructor
         *
         * @constructs Router
         */
        var Router = function () {

            window.addEventListener('popstate', _.bind(function (e) {
                e.preventDefault();
                this.routeChange(e.state);
            }, this));

            if (window.history) {

                window.document.addEventListener('click', _.bind(function (e) {
                    if (e.target !== e.currentTarget
                        && e.target.hasAttribute('href')
                        && !e.target.getAttribute('href').match(/^#/)
                        && !e.target.getAttribute('href').match(/(^http:\/\/|^https:\/\/)/)) {
                        e.preventDefault();
                        var url = e.target.getAttribute('href');

                        this.routeChange(url)

                        window.history.pushState(url, null, e.target.getAttribute('href'));
                    }
                }, this));

            }

        };

        /**
         * Route Change Method
         * @param  {String} route The route
         * @fires /App/Route/change
         */
        Router.prototype.routeChange = function (route) {
            events.trigger('/App/Route/change', route);
        }

        return new Router();

    });

} )(this, this.define, this.require, this.requirejs);
