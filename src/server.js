var LolApi = require ('leagueapi');

LolApi.init('RGAPI-20c4b613-38d2-4861-b46b-f489cc0f7c02','na');
var proList = ["Adrian","Akaadian","Altec","Looper","Pobelter","Arrow","scarra","Impact","Goldenglue","Shiphtur","Shrimp","Doublelift"
,"Olleh","zig","Cris","Sneaky","Ray","Gate","Reignover","Wildturtle","Hakuho","Pirean","Bjergson","Lourlo","Stunt","Chaser","Nientonsoh"
,"KiwiKid","BoxBox","Jensen","Seraph","Moon","Link","TheOddOne","Svenskeren","Hard","Trick2G","WingsofDeath","DontMashMe","Hi Im Gosu","Biofrost","Valkrin","Meteos","Ninja","NightBlue3","Piglet"
,"Reginald","Balls","Stixxay","Dardoch","Huni","Froggen","Fabbbyyy","Matt","Xmithie","Imaqtpie","Dyrus","Darshan","Big","Keith","Huhi","Keene","Hai","Cody Sun","Grigne","Xpecial","Saintvicious"
,"Yoona","Swifte","LOD","Hauntzer","Santorin","Smoothie","Altec","Lemonnation"];
// LolApi.getChampions(true, function(err, champs){
//   //console.log(champs);
// });
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
    if(match.participantIdentities)
    console.log(match);
  });
