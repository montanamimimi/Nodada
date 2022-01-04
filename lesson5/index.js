// Какой-то полный провал с ДЗ по этому курсу. Дело не в ноде даже а тупо нехватает знаний по JS. Плак плак

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");



(async () => {

    const isFile = (path) => fs.lstatSync(path).isFile();

    http.createServer( (req, res) => {
        // console.log(req.url);
        const fullPath = path.join(process.cwd(), req.url);
        console.log(fullPath);
        if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }

        let linksList = '';

        // advanced
        const urlParams = req.url.match(/[\d\w\.]+/gi);

        if (urlParams) {
            urlParams.pop();
            const prevUrl = urlParams.join('/');
            linksList = urlParams.length ? `<li><a href="/${prevUrl}">..</a></li>` : '<li><a href="/">..</a></li>';
        }
        //

        fs.readdirSync(fullPath)
            .forEach(fileName => {
                const filePath = path.join(req.url, fileName);
                linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
            });
        const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##links', linksList);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        return res.end(HTML);

    }).listen(5555);
})();




