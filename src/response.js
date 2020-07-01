const url = require('url');
const Path = require('path');
function Resolve(p) {
    return Path.join(__dirname, p);
}
const {
    readFile
} = require('./utils')


module.exports = function (req, res) {
    let {
        path
    } = url.parse(req.url, true)
    if (path.includes('static')) {
        let type = 'utf-8';
        let contentType = 'text/html;charset=utf-8'
        let clas = path.slice(path.lastIndexOf('.') + 1);
        if (['png', 'jpg', 'jpeg'].includes(clas)) {
            type = 'binary';
            contentType = 'image/' + clas;
        }
        switch (clas) {
            case 'text':
                contentType = 'text/plain;charset=utf-8'
                break;
            case 'js':
                contentType = 'text/js;charset=utf-8'
                break;
            case 'css':
                contentType = 'text/css;charset=utf-8'
                break;
            case 'pdf':
                contentType = 'application/pdf';
                type = 'binary';

        }
        readFile(Resolve(path), type).then(function (r) {
            res.writeHead(200, {
                "Content-Type": contentType
            })
            res.end(r, type);
        }).catch(function (params) {
            res.end('404 not found')
        })
        return;
    }

}