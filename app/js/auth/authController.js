app.controller("authController",function($scope, authService){

  console.log("Controller started");

  $scope.login = function(){
    authService.login($scope.user);
  }

  $scope.signup = function(){
    if($scope.user.email&&$scope.user.password){
      authService.signup($scope.user);
    }
  }
});