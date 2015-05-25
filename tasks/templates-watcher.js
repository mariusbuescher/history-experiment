var fs = require('fs');
var renderer = require('./template-renderer');

fs.watch('src/htdocs/data/', {
    persistent: true,
    recursive: true
}, function (evt, filename) {
    console.log('change detected in src/htdocs/data/' + filename);
    renderer()
});

fs.watch('src/htdocs/templates/', {
    persistent: true,
    recursive: true
}, function (evt, filename) {
    console.log('change detected in src/htdocs/templates/' + filename);
    renderer()
});
