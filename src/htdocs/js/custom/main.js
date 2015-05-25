(function (window, define, require, undef) {
    'use strict';

    require.config({

        paths: {
            'vendor' : '../vendor',

            'nunjucks': '../vendor/nunjucks',
            'nunjucks-slim': '../vendor/nunjucks-slim'
        }

    });

    define(['nunjucks'], function (nunjucks) {

        var contentRenderer = null;
        var titleRenderer = null;
        var njEnv = new nunjucks.Environment( new nunjucks.WebLoader('/templates') );

        var getDataUrl = function (url) {
            url = (url.match(/.html$/)) ? url : (url.match(/\/$/)) ? url + 'index.html' : url + '/index.html';
            url = url.replace(/.html$/, '.json');
            url = '/data' + url;
            return url;
        };

        var getData = function (url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.addEventListener('load', function () {
                    resolve(JSON.parse(this.responseText));
                });

                xhr.open('get', url, true);
                xhr.send();
            });
        };

        var initContentRenderer = function () {
            return new Promise(function (resolve, reject) {
                if (contentRenderer !== null) {
                    resolve(contentRenderer);
                } else {
                    njEnv.getTemplate('layouts/async-content.njs', true, function (err, tmpl) {
                        contentRenderer = tmpl;
                        resolve(contentRenderer);
                    });
                }
            });
        };

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

        var renderTemplates = function (url) {
            var pageData = null;
            getData(url).then(function (data) {
                pageData = data;
                return initContentRenderer();
            }).then(function (tmpl) {
                tmpl.render(pageData, function (err, res) {
                    window.document.getElementById('main-content').innerHTML = res;
                });
                return initTitleRenderer();
            }).then(function (tmpl){
                tmpl.render(pageData, function (err, res) {
                    window.document.title = res;
                });
            });
        };

        window.addEventListener('popstate', function (e) {
            e.preventDefault();
            renderTemplates(e.state);
        });

        window.document.addEventListener('click', function (e) {
            if (e.target !== e.currentTarget && e.target.hasAttribute('href')) {
                e.preventDefault();
                var url = getDataUrl(e.target.getAttribute('href'));

                renderTemplates(url);

                window.history.pushState(url, null, e.target.getAttribute('href'));
            }
        });
    });

}(this, this.define, this.require));
