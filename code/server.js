const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mustache = require('mustache-express');
const url = "mongodb://localhost:27017/courses";


const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;

MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err);
    db = database
    app.listen(3009, () => {
        console.log('listening on 3000')
    })
});


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});


app.post('/chercher', (req, res) => {
    console.log(req);


    db.collection('chercher').save(req.body, (err, result) => {
        if (err) return console.log(err);

        db.collection("chercher").find(req.body).toArray(function (err, result) {
            if (err) throw err;
            res.set('Access-Control-Allow-Origin', '*');
            console.log(result);


            res.json(result);


        });
    });
});