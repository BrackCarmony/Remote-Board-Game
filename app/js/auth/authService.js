var app = angular.module("chatApp");

app.service('authService',function($firebaseAuth,$firebaseArray,$firebaseObject){
  var baseUrl = "https://bracktestappchat.firebaseio.com/canvasChat";
  var ref = new Firebase(baseUrl);
  var auth = $firebaseAuth(ref);

  this.getAuth = function(){
    return auth;
  }

  this.login = function(user){
    var signup = this.signup;
    auth.$authWithPassword(user).then(function(){

    },function(err){
      console.log(err);
        signup(user);
    });
  }

  this.signup = function(user){

    var login = this.login;
    auth.$createUser(user).then(function(){
      console.log("Creation success");
      login(user);
    }, function (err){
      console.log(err);
      console.log("Sad Day");
    });
  }
})