var http = require("http");
var fs = require("fs");
var mime = require("mime");
var connect = require("connect");
var serverstatic = require("serve-static");
var port =4040;
var app = connect();
app.use(serverstatic(__dirname+"/"));
http.createServer(app).listen(port);
console.log("serveur à demarer");
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Animals';
MongoClient.connect(url,function(error,db){
	if(error) {console.log(error);}

	else	{
		let animals = db.collection('animals');
		animals.insert({name: 'sjshj' ,weight:'300lb'});
		animals.find({}).toArray(function(err,result){
			console.log(JSON.stringify(result));
		})
	
}	}
)
