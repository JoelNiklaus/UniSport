const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const mustache = require('mustache-express');


app.get('/',function(req,res){
  res.sendfile(__dirname+'./client/index.html');
});

app.listen(3009,function(){
	console.log('listenning');
})