(function (window, define, require, undefined) {
    'use strict';

    define({
        load: function (name, req, onload, config) {
            if (config.detect.tests[name].call()) {
                onload(config.detect.defaults[name].call());
            } else {
                req([config.detect.libs[name]], function (lib) {
                    onload(lib);
                });
            }
        }
    });
})(this, this.define, this.require);
