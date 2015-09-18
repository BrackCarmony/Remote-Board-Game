var app = angular.module("canvasChat");

app.service("chatviewService", function(fb, $firebaseObject, $firebaseArray){
  var firebaseRef = new Firebase(fb.url);


  this.getWorld = function(worldId){
    console.log(fb.url+"/"+worldId);
    var worldRef = new Firebase(fb.url+"/"+worldId);
    console.log(worldRef);

    return $firebaseObject(worldRef);  
  }
})