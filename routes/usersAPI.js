var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/users", {native_parser:true});

function getusers(app){
    console.log("entered getusers ");
    var defer = Q.defer();
    var data = {
    };
    db.collection('users').find().toArray(function (err, items) {
        if (items.length != 0) {
            data["Users"] = items;
            console.log("items recieved");
            console.log(data);
            defer.resolve(data);

        } else {

            res.json(data);
            defer.reject("error")
        }
    });

    return defer.promise;
};


function postuser(app,req){
    var defer = Q.defer();
    var username = req.username;
    var data = {
        "error":1,
        "Users":""
    };

    if(!!username){
        db.collection('users').insert({username:username}, function(err, result) {
            if(!!err){
                data["Users"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Users"] = "User Added Successfully";
            }
            defer.resolve(data);
        });
    }else{
        data["Users"] = "Please provide required data (i.e : username)";
        defer.reject(data);
    }
    return defer.promise;
};

function deleteuser(app,req){
    app.delete('/user/:username',function(req,res){
        var username = req.params.username;
        var data = {
            "error":1,
            "Users":""
        };
        if(!!username){
            db.collection('users').remove({username:username}, function(err, result) {
                if(!!err){
                    data["Users"] = "Error deleting user";
                }else{
                    data["error"] = 0;
                    data["Users"] = "Delete User Successfully";
                }
                res.json(data);
            });
        }else{
            data["Users"] = "Please provide all required data (i.e : username )";
            res.json(data);
        }
    });
};

module.exports.getusers = getusers;
module.exports.postuser = postuser;
module.exports.deleteuser = deleteuser;
