var app   = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/users", {native_parser:true}); // Connection MongoDB book collection DB
var ejs = require("ejs");
var Q = require('q');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
    req.db = db;
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

http.listen(8080,function(){
    console.log("Connected & Listen to port 8080");
});
console.log("............................... ");
var userAPI = require("./routes/usersAPI");


var users = userAPI.getusers(app).then (
    function(users) {

console.log("entered ");
        console.log(users);
        app.get('/', function (req, res) {

            res.render('users.ejs', {data: users})
        });
    });

var req = {username: "asdf"} ;
var users = userAPI.postuser(app,req).then (
    function(users) {

console.log("entered ");
        console.log(users);
        app.get('/', function (req, res) {

            res.render('users.ejs', {data: users})
        });
    });
