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
        
            
    });
});

const express = require("express");
const app = express();
const jsonParser = express.json();

app.get("/api/companies", function(req, resolve){
    db.collection("shops").find({}, {"_id":false}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });
        
});

app.get("/api/companies/:id", function(req, resolve){
    db.collection("shops").find({
        id: Number(req.params.id)
    }, {"_id":0}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });
        
});

app.get("/api/categories", function(req, resolve){
    db.collection("menu").find().toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });
        
});

app.get("/api/categories/:id", function(req, resolve){
    db.collection("menu").find({
        id: Number(req.params.id)
    }, {"_id":0}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });
        
});

app.get("/api/dishes", function(req, resolve){
    db.collection("food").find({}, {"_id":0}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });
        
});

app.get("/api/dishes/:id", function(req, resolve){
    db.collection("food").find({
        id: Number(req.params.id)
    }, {"_id":0}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });   
});

app.post("/api/orders", jsonParser, function(req, resolve) {
    if(req.body.phone==undefined||req.body.client==undefined||req.body.shop==undefined||req.body.menuCat==undefined||req.body.food==undefined) return resolve.status(400);
    let order = { 
        "id": 0,
        "price": 0,
        "phone": req.body.phone,
        "client": req.body.client,
        "shop": req.body.shop,
        "menuCatId": req.body.menuCat,
        "foodId": req.body.food
    }
    db.collection("food").find({
        id: {$in: req.body.food}
    }).toArray((err, res) => {
        if(!res) return resolve.status(400);
        for(var i = 0; i<res.length;i++){
            order.price += res[i].price;
        }
    });
    db.collection("orders").find().sort({
        id: -1
    }).limit(1).toArray((err, res) => {
        if (res.length != 0){ id = res[0].id + 1 }else{ id = 1};
        
        db.collection("orders").insertOne(order);
    });
});

app.get("/api/orders/:id", function(req, resolve){
    db.collection("orders").find({
        id: Number(req.params.id)
    }, {"_id":0}).toArray((err, res) => {
        if(err) console.log(err);
        resolve.send(res);
    });   
});

app.listen(8080, function(){
    console.log("Сервер запущен!");
});