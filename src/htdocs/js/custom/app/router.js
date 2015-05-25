( function( window, define, require, requirejs, undefined ) {

    define(['lodash', 'app/event_contextual'], function ( _, events ) {

        var Router = function () {

            window.addEventListener('popstate', _.bind(function (e) {
                e.preventDefault();
                this.routeChange(e.state);
            }, this));

            window.document.addEventListener('click', _.bind(function (e) {
                if (e.target !== e.currentTarget && e.target.hasAttribute('href')) {
                    e.preventDefault();
                    var url = e.target.getAttribute('href');

                    this.routeChange(url)

                    window.history.pushState(url, null, e.target.getAttribute('href'));
                }
            }, this));

        };

        Router.prototype.routeChange = function (route) {
            events.trigger('/App/Route/change', route);
        }

        return new Router();

    });

} )(this, this.define, this.require, this.requirejs);
