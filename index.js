var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    io = require('socket.io')(server),
    mongoose = require('mongoose');

//realizarea conexiunii la baza de date
mongoose.connect("mongodb://localhost/Romania100").then(
    () => {
        console.log('Connected to mongodb')
    },
    err => {
        console.log(err);
    }
);

// schema de baza pentru orase
var schemaOrase = new mongoose.Schema({
    name: 'string',
    judet: 'string',
    details: 'string',
    img: 'string',
    panorama: 'string',
    reviews: 'array',
    likes: 'Number'
});

// schema de baza pentru traditii
var schemaTraditii = new mongoose.Schema({
    name: 'string',
    img: 'string',
    detalii: 'string'
});

// schema de baza pentru mancare
var schemaMancare = new mongoose.Schema({
    name: 'string',
    img: 'string'
});

// model facut pe baza schemei
var orase = mongoose.model('Orase', schemaOrase, 'Orase');
var mancare = mongoose.model('Mancare', schemaMancare, 'Mancare');
var traditii = mongoose.model('Traditii', schemaTraditii, 'Traditii');

// se încarcă folderul cu resurse
app.use('/lib', express.static('lib'));

// afisarea paginii principale
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/view/index.html');
});

// inițializare middleware pentru preluare parametrii POST din request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// returnarea informațiilor - API
app.get('/orase', function (req, res) {
    orase.find({}, function (err, results) {
        res.send(results);
    });
});
app.get('/mancare', function (req, res) {
    mancare.find({}, function (err, results) {
        res.send(results);
    });
});
app.get('/traditii', function (req, res) {
    traditii.find({}, function (err, results) {
        res.send(results);
    });
});

// adaugarea review
app.post('/addReview', function (req, res) {
    var orasid = req.body.id,
        name = req.body.userName,
        text = req.body.content,
        rating = req.body.rating,
        build = 'reviews'; // pentru crearea etichetei json
    console.log(orasid);
    orase.update({ // filtrează orase după ID
            "_id": orasid
        }, { // adaugă în array
            "$push": {
                [build]: // nume variabil json, creat după indexul respectivului departament
                {
                    "name": name,
                    "content": text,
                    "rating": rating,
                    "time": Date.now()
                }
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while adding')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Added review');
        }
    )
});

// adăugare like
app.post('/like', function (req, res) {
    var orasid = req.body.id; // memorează id-ul oraşului
    orase.update({
            "_id": orasid
        }, {
            "$inc": {
                "likes": 1 // se incrementează cu 1 
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while liking')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Added like');
        })
});

app.post('/dislike', function (req, res) {
    var orasid = req.body.id; // memorează id-ul oraşului
    orase.update({
            "_id": orasid
        }, {
            "$inc": {
                "likes": -1 // se incrementează cu -1
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while disliking')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Remove like');
        })
});


// acceptă clienți pe socket pentru informarea în momentul actualizării
io.on('connection', function (socket) {
    console.log('a user connected');
});

server.listen(8000, function () {
    console.log('App listening on port 8000...');
});
