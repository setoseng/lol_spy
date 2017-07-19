var express = require('express');
var app = express();
var cors = require('cors');

var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/lol_spy");

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("connection succeeded");
})
var Schema = mongoose.Schema;
var playerSchema = new Schema({
  stats: {}
});
var player = mongoose.model('Player',playerSchema);

app.use(cors());
app.get('/getplayer',function(req,res){
  console.log(req.query.playerid);
  player.findOne({},function(err,players){

    console.log(players.stats[req.query.playerid]);
    res.json({value:players.stats[req.query.playerid]});
  });

});

app.listen(4000);
