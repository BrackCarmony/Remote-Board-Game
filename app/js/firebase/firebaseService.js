var app = angular.module("chatApp");

app.service("firebaseService", function($firebaseObject, $firebaseArray){
  var baseUrl = "https://bracktestappchat.firebaseio.com/canvasChat";

  this.getWorld = function(worldName){
    var firebaseRef = new Firebase(baseUrl + "/world/" + worldName);

    return $firebaseObject(firebaseRef);
  };

  this.getPlayer = function(worldName, personId){
    var firebaseRef = new Firebase(baseUrl + "/world/" + worldName +
       "/players/" + personId); 

    return $firebaseObject(firebaseRef);
  }
})