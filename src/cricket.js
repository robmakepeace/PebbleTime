//list all matches
//http://cricscore-api.appspot.com/csa 

//get current score
//http://cricscore-api.appspot.com/csa?id=892517
var matchID = '892517';
var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function getScore() {
  // We will request the weather here
  //var url = 'http://cricscore-api.appspot.com/csa
  var url = 'http://cricscore-api.appspot.com/csa?id=' + matchID;

   // Send request to OpenWeatherMap
  xhrRequest(url, 'GET', 
    function(responseText) {
      // responseText contains a JSON object with weather info
      var json = JSON.parse(responseText);
      
      var score = json[0].de;
      console.log('Score is ' + score);
      var id = json[0].id;
      console.log('Match Id is ' + id);
      var history = json[0].si;
      console.log('History is ' + history);
      // Assemble dictionary using our keys
      var dictionary = {
        "KEY_SCORE": score,
        "KEY_ID": id,
        "KEY_HISTORY": history
      };

      // Send to Pebble
      Pebble.sendAppMessage(dictionary,
        function(e) {
          console.log("Cricket info sent to Pebble successfully!");
        },
        function(e) {
          console.log("Error sending cricket info to Pebble!");
        }
      );
    }      
  );
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
  function(e) {
    console.log('PebbleKit JS ready!');

    // Get the initial weather
    getScore();
  }
);
// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function(e) {
    console.log('AppMessage received!');
  }                     
);
