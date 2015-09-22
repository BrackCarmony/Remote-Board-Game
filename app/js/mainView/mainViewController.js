var app = angular.module("chatApp");

app.controller("mainViewController", function($scope, world, firebaseService){

  $scope.world = world;
  //player.$bindTo($scope, "player");
  $scope.uselessFunction = function(){
    console.log("I'm a useless Function!!!");
  }
  $scope.selectPlayer = function(player){
    console.log(player);
    var temp = firebaseService.getPlayer(world.$id, player);
    console.log(temp);
    //temp.$bindTo($scope, "player");
    $scope.player = temp;
  };

})