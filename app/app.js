var app = angular.module("chatApp",['firebase','ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when("/:id/chat/:world",{
    template:"<chat-directive world = 'world' player = 'player'></chat-directive>",
    controller:"chatController",
    resolve:{
      world:function(firebaseService){
        return firebaseService.getWorld("firstWorld").$loaded();
      },
      player:function(firebaseService, $route){
        return firebaseService.getPlayer("firstWorld", $route.current.params.id);
      }
    }
  }).when("/:id/settings",{
    templateUrl:"app/player_settings/settings_template.html",
  }).otherwise({
    redirectTo:"1/chat/world1"
  })
})