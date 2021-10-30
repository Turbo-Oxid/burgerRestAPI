const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID, db;

MongoClient.connect("mongodb://localhost:27017", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function (err, database) {
	if (err) return console.log("Ошибка загрузки DB: " + err);
	db = database.db("burgerRestAPI");
	db.stats((err, res) => {
		if (err) return logger.err(err);
		console.log("Усп. подкл. к DB:\t" + res.db +
			"\nРазделов:\t\t" + res.collections +
			"\nОбъектов:\t\t" + res.objects +
			"\nРазмер базы:\t\t" + (res.dataSize / 1024 / 1024).toFixed(2) + "МБ");
        app.listen(3000, function(){
            console.log("Сервер запущен!");
        });
            
    });
});

const express = require("express");
const app = express();
const jsonParser = express.json();

app.get("/api/companies", function(req, res){
    console.log(1);
    db.collection("shops").find().toArray((err, res) => {
        if(err) console.log(err);
        res.send(res);
    });
        
});

