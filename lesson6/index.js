const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

const msg = { message: 'New client connected!', name: ''};
const welcomeMsg = { message: 'Welcome to chat!', name: ''};

let counter = 0;

io.on('connection', client => {

    counter += 1;

    let clientName = client.id;

    client.emit('change-count', counter);
    client.broadcast.emit('change-count', counter);

    client.broadcast.emit('server-msg', msg);
    client.emit('server-msg', welcomeMsg);

    client.on('client-msg', (data) => {
        
        const payload = {
            message: data.message.split('').reverse().join(),
            name: clientName,
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);       
    });
});



server.listen(5555);