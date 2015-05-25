(function (window, define, require, undef) {
    'use strict';

    require.config({

        paths: {
            'vendor' : '../vendor',

            app:            'app',
            config:         'config',
            modules:        'modules',
            extensions:     'extensions',
            services:       'services',

            lodash:         '../vendor/lodash',
            jquery:         '../vendor/jquery-2.1.3',
            'nunjucks': '../vendor/nunjucks',
            'nunjucks-slim': '../vendor/nunjucks-slim'
        }

    });

    define( [
        'jquery',
        'lodash',

        'nunjucks',

        'services/page-data',

        'app/core',
        'app/event_contextual',
        'app/router',
        'app/module',

        'config/base'
    ], function($, _, nunjucks, PageDataService, App, Events ) {

        var contentRenderer = null;
        var titleRenderer = null;
        var njEnv = new nunjucks.Environment( new nunjucks.WebLoader('/templates') );

        var initTitleRenderer = function () {
            return new Promise(function (resolve, reject) {
                if (titleRenderer !== null) {
                    resolve(titleRenderer);
                } else {
                    njEnv.getTemplate('layouts/async-title.njs', true, function (err, tmpl) {
                        titleRenderer = tmpl;
                        resolve(titleRenderer);
                    });
                }
            });
        };

        var renderTitle = function (route) {
            var pageData = null;
            PageDataService.getData(route).then(function (data) {
                pageData = data;
                return initTitleRenderer();
            }).then(function (tmpl){
                tmpl.render(pageData, function (err, res) {
                    window.document.title = res;
                });
            });
        };

        Events.on('/App/Route/change', function (event, route) {
            renderTitle(route);
        });

        App.init();

    });

}(this, this.define, this.require));
