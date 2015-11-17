var app   = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/users", {native_parser:true}); // Connection MongoDB book collection DB
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
    req.db = db;
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

http.listen(8000,function(){
    console.log("Connected & Listen to port 8000");
});
//
app.get('/users',function(req,res){
    var data = {
        "Data":""
    };
    var db = req.db;
    db.collection('users').find().toArray(function (err, items) {
        if(items.length != 0){
            data["error"] = 0;
            data["Users"] = items;
            res.json(data);
        }else{
            data["error"] = 1;
            data["Users"] = 'No Users Found..';
            res.json(data);
        }
    });
});
