var LolApi = require ('leagueapi');

LolApi.init('RGAPI-d9d23789-ffc3-4e06-b04b-2a7eb5a161a9','na');

LolApi.getChampions(true, function(err, champs){
  //console.log(champs);
});
options = {rankedQueues: ['RANKED_SOLO_5x5','RANKED_TEAM_5x5'], beginIndex: 1, endIndex: 10};
LolApi.Summoner.getByName('Malicious Donut')
  .then(function (summoner){
    console.log(summoner.maliciousdonut.id);
  });
LolApi.getMatchHistory("20557835",options)
  .then(function (history){
    console.log(history);
  });
LolApi.getMatch("2074924517")
  .then(function(match){
    console.log(match);
  });
