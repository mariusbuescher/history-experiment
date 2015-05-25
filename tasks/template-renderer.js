var nunjucks = require('nunjucks');
var fs = require('fs-extra');
var path = require('path');

var readDir = function (dirPath) {
    fs.readdir(dirPath, function (err, files) {
        if (!err) {
            files.forEach(function (file) {
                if (path.extname(file) === '.json') {

                    // path construciton
                    var destPathTemp = path.relative('src/htdocs/data', dirPath + '/' + file);
                    var destPathObj = path.parse(destPathTemp);

                    destPathObj.ext = '.html';
                    destPathObj.base = destPathObj.name + destPathObj.ext;

                    var destPath = path.format(destPathObj);

                    // get data
                    var data = fs.readJsonSync(dirPath + '/' + file);

                    // rendering
                    var env = new nunjucks.Environment( new nunjucks.FileSystemLoader('src/htdocs/templates', true) );
                    var htmlString = env.render('layouts/master.njs', data);

                    fs.outputFileSync('src/htdocs/pages/' + destPath, htmlString);


                } else {
                    readDir(dirPath + '/' + file);
                }
            });
        }

    });
};

module.exports = function () {
    console.log('rendering templates...');
    readDir('src/htdocs/data');

}


