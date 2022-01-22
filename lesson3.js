const fs = require('fs');
let readline = require('readline');

const ACCESS_LOG = './access.log';
const ACCESS_LOG_WRITE = './89.123.1.41.log';
const ACCESS_LOG_WRITE2 = './34.48.240.111.log';

const rd = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
  //  output: proccess.stdout,
    terminal: false
});

const writeStream = fs.createWriteStream(ACCESS_LOG_WRITE, {
    flags: 'a',
    encoding: 'utf-8', 
});

const writeStream2 = fs.createWriteStream(ACCESS_LOG_WRITE2, {
    flags: 'a',
    encoding: 'utf-8', 
});


rd.on('line', (line) => {
    let result = /89.123.1.41/g.test(line);
    let result2 = /34.48.240.111/g.test(line);
    if (result) {
        writeStream.write(line + '\n');
    } else if (result2) {
        writeStream2.write(line + '\n');
    }
});
