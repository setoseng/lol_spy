var express = require('express');
var app = express();
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL || {database:'lol_spy'});
var LolApi = require ('leagueapi');


LolApi.init('RGAPI-e6bb7ec7-b596-47cc-8fd4-c119a7ee8ee2','na');
var proList = ["Adrian","Akaadian","Altec","Looper","Pobelter","Arrow","scarra","Impact","Goldenglue","Shiphtur","Shrimp","Doublelift"
,"Olleh","zig","Cris","Sneaky","Ray","Gate","Reignover","Wildturtle","Hakuho","Pirean","Bjergson","Lourlo","Stunt","Chaser","Nientonsoh"
,"KiwiKid","BoxBox","Jensen","Seraph","Moon","Link","TheOddOne","Svenskeren","Hard","Trick2G","WingsofDeath","DontMashMe","Hi Im Gosu","Biofrost","Valkrin","Meteos","Ninja","NightBlue3","Piglet"
,"Reginald","Balls","Stixxay","Dardoch","Huni","Froggen","Fabbbyyy","Matt","Xmithie","Imaqtpie","Dyrus","Darshan","Big","Keith","Huhi","Keene","Hai","Cody Sun","Grigne","Xpecial","Saintvicious"
,"Yoona","Swifte","LOD","Hauntzer","Santorin","Smoothie","Altec","Lemonnation"];
var proList2 = ["Adrian","Impact","Doublelift"];

options = {rankedQueues: ['RANKED_SOLO_5x5','RANKED_TEAM_5x5'], beginIndex: 1, endIndex: 4};

var promises = [];
var gameId=[];
var pro;

var players_stats = {
  //'Adrian': {matches: {}}
};

var games = {
  //id: [players]
}

for(var x=0;x <proList2.length;x++){
  pro = proList2[x];
  var p = LolApi.Summoner.getByName(pro);
  promises.push(p);
  console.log(pro);
}

Promise.all(promises)
  .then(function (results) {
    var plist = [];
    results.forEach(function (summoner, index) {
      var pro = proList2[index];
      var proReplace= pro.toLowerCase();
      proReplace = proReplace.replace(/ /g,"");
      //console.log(proReplace);
      //console.log("ID", summoner[proReplace].id);
      plist.push(LolApi.getMatchHistory(summoner[proReplace].id,options));
    });

    return Promise.all(plist);
  })
  .then(function(history_results){
    history_results.forEach(function (history) {
      console.log('matches', history.matches.length);
      history.matches.forEach(function(game,index){
        gameId.push(game.matchId);
      });
    });
  })
  .then(function(){
    var matchPromise = [];
    console.log(gameId.length);
    gameId.forEach(function(matchId){
      matchPromise.push(LolApi.getMatch(matchId));
    })
    return Promise.all(matchPromise);
  })
  .then(function(match){
    var participantPromise = [];
    var holders = [];
    console.log('matches', match.length);
    for (var k=0; k < match.length; k++) {
      var matchId = gameId[k];
      var matches = match[k];

      // probably db lookup
      if (!games[matchId]) {
        games[matchId] = [];
      }

      for (var i=0; i < matches.participantIdentities.length; i++) {
        let prop = matches.participantIdentities[i];
        games[matchId].push(prop.player.summonerName);

        for(var j=0; j < matches.participants.length; j++){
          holder = matches.participants[j];
          if(holder.participantId == prop.participantId){
            console.log(prop.player.summonerName);
            // maybe db
            if (!players_stats[prop.player.summonerName]) {
              players_stats[prop.player.summonerName] = {matches: {}};
            }
            players_stats[prop.player.summonerName].matches[matchId] = holder;
          }
        }
      }
    }
  })
  .then(function(holders) {
    console.log(JSON.stringify(players_stats, null, 2));
    console.log(JSON.stringify(games, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });


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
