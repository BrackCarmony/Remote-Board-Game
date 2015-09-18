var app = angular.module("chatApp");

app.controller("chatController", function($scope, world, player){
  $scope.world = world;
  player.$bindTo($scope, "player");
  if(!player.x){
    player.x = Math.random()*1000;
    player.y = Math.random()*1000;
  }

})