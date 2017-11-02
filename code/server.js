
const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const url ="mongodb://localhost:27017/names";


const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  
});





app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(__dirname+'/views'))

app.get('/',function(req,res){
  res.sendFile('index.html');
})



  app.post('/insert', (req, res) => {
  	  console.log(req.body);
      var l = req.body.name;
      var query = { 'name': l}
            console.log(query);

      

  db.collection('insert').save(req.body, (err, result) => {
   if (err) return console.log(err);

   db.collection("insert").find(query).toArray(function(err, result) {
    if (err) throw err;
  res.set('Access-Control-Allow-Origin', '*');
    console.log(result)


  res.json(result);
    

 });
  });

  


});


app.post('/delete', (req, res) => {
        console.log("todelete");

      console.log(req.body);
      var l = req.body.name;
      var query = { 'name': l}
            console.log(query);

      

  db.collection("insert").deleteMany(query, function(err, obj) {
    if (err) throw err;

    console.log(obj.result.n+"   document deleted");
    res.json(obj.result);
  });

    

 });

app.get('/show', (req, res) => {
        console.log("show");

      

  db.collection("insert").find({}).toArray(function(err, result) {
    if (err) throw err;

    console.log(result);
    res.json(result);
  });

    

 });
  
  






  app.listen(3000, () => {
    console.log('listening on 3000')
  });