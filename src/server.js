var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL || {database:'lol_spy'});
var LolApi = require ('leagueapi');


LolApi.init('RGAPI-43a2bd6e-5169-46ce-bb07-5e4063ad1744','na');
var proList = ["Adrian","Akaadian","Altec","Looper","Pobelter","Arrow","scarra","Impact","Goldenglue","Shiphtur","Shrimp","Doublelift"
,"Olleh","zig","Cris","Sneaky","Ray","Gate","Reignover","Wildturtle","Hakuho","Pirean","Bjergson","Lourlo","Stunt","Chaser","Nientonsoh"
,"KiwiKid","BoxBox","Jensen","Seraph","Moon","Link","TheOddOne","Svenskeren","Hard","Trick2G","WingsofDeath","DontMashMe","Hi Im Gosu","Biofrost","Valkrin","Meteos","Ninja","NightBlue3","Piglet"
,"Reginald","Balls","Stixxay","Dardoch","Huni","Froggen","Fabbbyyy","Matt","Xmithie","Imaqtpie","Dyrus","Darshan","Big","Keith","Huhi","Keene","Hai","Cody Sun","Grigne","Xpecial","Saintvicious"
,"Yoona","Swifte","LOD","Hauntzer","Santorin","Smoothie","Altec","Lemonnation"];
var proList2 = ["Adrian","Impact"];

options = {rankedQueues: ['RANKED_SOLO_5x5','RANKED_TEAM_5x5'], beginIndex: 1, endIndex: 10};

var promises = [];
var gameId = [];
for(var x=0;x <proList2.length;x++){
  var pro = proList2[x];
  var p = LolApi.Summoner.getByName(pro);
  promises.push(p);
}

Promise.all(promises)
  .then(function (results) {
    results.forEach(function (summoner, index) {
      var pro = proList2[index];
      var proReplace= pro.toLowerCase();
      proReplace = proReplace.replace(/ /g,"");
      //console.log(proReplace);
      //console.log("ID", summoner[proReplace].id);
      LolApi.getMatchHistory(summoner[proReplace].id,options)
       .then(function (history){
         history.matches.forEach(function(game,index){
           gameId.push(game.matchId);
         });
       })
       .then(function(){
         console.log(gameId);
       })
    });
  })
  .catch(function (error) {
    console.log(error);
  });
// LolApi.getMatch("2074924517")
//   .then(function(match){
//     console.log(match);
//   });
// LolApi.getMatch("2074924517")
//   .then(function(match){
//     var ID;
//     for (var i=0; i < match.participantIdentities.length; i++) {
//       let prop = match.participantIdentities[i];
//
//       if(prop.player.summonerName==="Malicious Donut"){
//         ID = prop.participantId;
//         break;
//       }
//     }
//
//     for(var j=0; j < match.participants.length; j++){
//       let holder = match.participants[j];
//       if(holder.participantId==ID){
//         return holder;
//       }
//     }
//     //  var summonerId;
//     //  match.participantIdentities.forEach(function(prop){
//     //    if(prop.player.summonerName==="Malicious Donut"){
//     //      summonerId = prop.participantId;
//     //    }
//     //  });
//     //    return summonerId;
//   })
//   .then(function(holder){
//     console.log(holder);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
