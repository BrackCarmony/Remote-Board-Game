var app = angular.module("chatApp");

app.directive("chatDirective", function(){
  return {
    templateUrl:"app/js/chat/chat_template.html",
    scope:{world:"=", player:"="},
    link:function(scope, elem, atts){

      var canvas = elem.find("canvas")[0];
      var ctx = canvas.getContext("2d");
      var input = elem.find("input")[0];
      var images = {};
      var personSize = 100;
      scope.ctx = ctx;

      window.requestAnimationFrame(draw);

      function draw(){
        clear();
        ctx.fillStyle = "#333";
        ctx.font = "30px Georgia";

        for (objId in scope.world.objects){
          var obj = scope.world.objects[objId];
        }

        for(playerId in scope.world.players){
          player = scope.world.players[playerId];
          if (player){
            if(images[player.img]){
              ctx.drawImage(images[player.img],player.x,player.y,personSize,personSize);
            }
            else if (player.img){
              images[player.img] = new Image();
              images[player.img].src = player.img;
            }else{
              ctx.fillRect(player.x, player.y, personSize,personSize);  
            }
            if (player.message){
              ctx.fillText(player.message,player.x,player.y-5);
            }
          }
        } 
         window.requestAnimationFrame(draw)
      }

      


      clear = function(){

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0,0,1000,1000);
      }
      movePlayer = function(deltaX,deltaY){
        scope.player.x +=deltaX;
        scope.player.y +=deltaY;
      }

      function drawObj(img){

      }

      function setPlayerMessage(){
        var message = input.value
        if (checkMessage){
          scope.player.message = message
        }
        //console.log(scope);
      }
      scope.keyPress=function($event){
        //console.log($event.which)
        switch($event.which){
          case 38: //Up
            movePlayer(0,-5);
          break;
          case 40: //Down
            movePlayer(0,5);
          break;
          case 39: //Right
            movePlayer(5,0);
          break;
          case 37: //Left
            movePlayer(-5,0);
          break;
          case 13:
            setPlayerMessage();
          break;
        }

    
      }

    }
  }
})