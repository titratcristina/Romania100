var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

app.use('/lib', express.static('lib'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/view/index.html');
});

server.listen(8000, function () {
    console.log('listening...');
});
