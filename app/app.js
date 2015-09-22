var app = angular.module("chatApp",['firebase','ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when("/chat/:world",{
    templateUrl:"app/js/mainView/main_view_template.html",
    controller:"mainViewController",
    resolve:{
      world:function(firebaseService, $route){
        return firebaseService.getWorld($route.current.params.world).$loaded();
      }
    }
  }).when("/:id/settings",{
    templateUrl:"app/player_settings/settings_template.html",

  }).when("/login",{
    templateUrl:"app/js/auth/auth_template.html",
    controller:"authController"
  }).otherwise({
    redirectTo:"/chat/world1"
  })
})

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}