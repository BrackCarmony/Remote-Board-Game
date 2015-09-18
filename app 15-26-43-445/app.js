app = angular.module('canvasChat',['ngRoute', 'firebase'])

app.constant('fb',{url:"https://bracktestappchat.firebaseio.com/TestWorld"});
app.config(function($routeProvider){
  $routeProvider.when("/chat",{
  
    templateUrl:"app/js/chatview/chatview_template.html",
    controller:"chatController",
    resolve:{
      world:function(chatviewService){
        console.log(chatviewService.getWorld("firstWorld"));
        return chatviewService.getWorld("firstWorld").loaded();
      }
    }
  }).otherwise({
    redirectTo:"/chat"
  });
});