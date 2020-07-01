const fs = require('fs');
const Path = require('path');


module.exports = {
    readFile: function (port, type="utf-8") {
        console.log(2)
        return new Promise(function (resolve, reject) {
            fs.readFile(port,type, (err, data) => {
                console.log(3)
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(data)
            })
        })
    },
    writeFile: function(port,context){
        fs.writeFileSync(port, context);
    },
    Resolve: function (p) {
        return Path.join(__dirname, p);
    }

}