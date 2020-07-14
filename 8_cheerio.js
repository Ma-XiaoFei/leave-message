let axios = require('axios');
let fs = require('fs');
let mysql = require('mysql');
let cheerio = require('cheerio');
let url = 'https://www.doutula.com/article/list/?page=';
let page = 1;

function initPage(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(({
            data
        }) => {
            let $ = cheerio.load(data);
            $('.random_title').each((_, t) => {
                let href = $(t).parent('a').attr('href');
                let text = $(t).text();
                if (text === '赞助商广告') return true;
                let dirName = '/Images/' + text;
                fs.mkdirSync(dirName);
                getContent(href, dirName);
            })

        })
    })

}
let i = 0;
while(i<30){
    initPage(url + page)
    page ++;
    i++;
}
async function getContent(url, dirName) {
    let {
        data
    } = await axios.get(url);
   
    let $ = cheerio.load(data);
    $('img').each((_, t) => {
        let src = $(t).attr('src')
        let aftIndex = src.lastIndexOf('.');
        let afterName = src.slice(aftIndex);
        let beforeName = src.slice(src.lastIndexOf('/'), aftIndex);
        axios.get(src, {
            responseType: 'stream'
        }).then(res => {
            let writeStream = fs.createWriteStream(dirName + beforeName + afterName)
            res.data.pipe(writeStream)
        }) 
    })
}
