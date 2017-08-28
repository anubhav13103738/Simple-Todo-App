/**
 * Created by annu1 on 8/27/2017.
 */
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var path = require("path");
var url = 'mongodb://root:root@ds161493.mlab.com:61493/codalien';
var db;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname + '/../../../public')));

app.get("/",(req,res)=>{
    //console.log( path.join(__dirname + '/../../../'));
    //res.send("ok");
    res.sendFile(path.join(__dirname+'/../../../index.html'));
});

app.post("/backendDataTransfer",(req,res)=>{
    // console.log("api hit");
    // console.log("req.body--->>",req.body);
    //console.log("req.body.params--->>>",req.body.params);
    db.collection('todos').insertOne(req.body,function (err) {
       if(err){
           console.log("error in inserting document");
       }else{
           console.log("done inserting document");
       }
    });
    res.end("insertion done");
});

app.post("/deleteData",(req,res)=>{
    var o_id = new mongo.ObjectID(req.body.id);
    db.collection('todos').deleteOne({ "_id" : o_id },function (err) {
       if(err){
           console.log('error in deleting data',err);
       }else{
           console.log('deletion done successfully');
       }
    });
    res.end('deletion done');
});

app.post("/updateData",(req,res)=>{
    var o_id = new mongo.ObjectID(req.body.id);
    db.collection('todos').updateOne({ "_id" : o_id }
        , { $set: { "name" : req.body.name, "desc": req.body.desc}},function (err) {
           if(err){
               console.log('err',err);
           }else{
               console.log('successfully updated');
           }
        });
    res.end("updation done");
});

app.get("/gotData",(req,res)=>{
    //console.log( path.join(__dirname + '/../../../'));
    //res.send("ok");
    db.collection('todos').find().toArray(function (err,docs) {
    if(err){
        console.log('error in finding docs');
    }else{
        //console.log('docs found',docs);
        res.send(docs);
    }
});
});

app.listen("1234",function (err) {
    if(err){
        console.log("cannot open server:", err);
    }else {
        MongoClient.connect(url, function(err, database) {
            if(err){
                console.log("mongodb connection error");
            }else{
                db = database;
                console.log("Connected correctly to mongodb codalien db"); 
            }
        });
        console.log("listening on 1234");
    }
})