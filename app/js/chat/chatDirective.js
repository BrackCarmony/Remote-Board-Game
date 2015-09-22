var app = angular.module("chatApp");

app.directive("chatDirective", function(firebaseService){
  return {
    templateUrl:"app/js/chat/chat_template.html",
    scope:{world:"=", player:"="},
    link:function(scope, elem, atts){

      var canvas = elem.find("canvas")[0];
      var ctx = canvas.getContext("2d");
      var input = elem.find("input")[0];
      var images = {};
      var personSize = 100;
      var dragged = false;
      var draggedEvent ={};
      var draggedPlayer = "";
      scope.ctx = ctx;

      window.requestAnimationFrame(draw);



      function draw(){
        clear();
        ctx.fillStyle = "#333";
        
        if(scope.world.settings.playerSize){
          personSize = scope.world.settings.playerSize;
        }

        if (scope.world.background){
          var url = scope.world.background.url;
          if (images[url]){
            ctx.drawImage(images[url],0,0,1000,1000);
          }else{
            images[url] = new Image();
            images[url].src = url;
          }
          if(scope.world.background.grid){
            if (scope.world.background.grid.type === "square"){
              drawSquareGrid();
            }else if(scope.world.background.grid.type ==="hex"){
              drawHexGrid();
            }   
          }
        }

        for (objId in scope.world.objects){
          var obj = scope.world.objects[objId];
        }

        for(playerId in scope.world.players){
          player = scope.world.players[playerId];
          if (player){
            if(images[player.img]){
              var opacity = 1;
              if(player.opacity){
                opacity = player.opacity;
              }
              ctx.globalAlpha = opacity;
              ctx.drawImage(images[player.img],player.x,player.y,personSize,personSize*images[player.img].height/images[player.img].width);
              ctx.globalAlpha = 1;
            }
            else if (player.img){
              images[player.img] = new Image();
              images[player.img].src = player.img;
            }else{
              ctx.fillRect(player.x, player.y, personSize,personSize);  
            }
            if (player.message){
              
              var offset = 10;
              ctx.font = "30px Georgia";
              ctx.fillStyle = "rgba(240,240,240,.5)";
              var size = ctx.measureText(player.message);
              
              ctx.fillRect(player.x-5 - offset, player.y-10-2*offset-15, size.width + 2*offset, 30 + 2*offset);
              ctx.fillStyle = "rgba(33,33,33,1)";
              ctx.fillText(player.message,player.x-5,player.y-10);
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
        scope.player.$save();
      }

      function drawObj(img){

      }

      function setPlayerMessage(){
        var message = input.value
        if (checkMessage()){
          scope.player.message = message
          scope.player.$save();
        }
        //console.log(scope);
      }

      function setPlayerHide(){
        scope.player.opacity = .5;
        scope.player.$save();
      }


      function setPlayerInvisible(){
        scope.player.opacity = .1;
        scope.player.$save();
      }

      function setPlayerVisible(){
        scope.player.opacity = 1;
        scope.player.$save();
      }

      function checkMessage(){
        var message = input.value;
        if (message.slice(0,1)==="/"){
        var wordAry = message.toLowerCase().split(" ");
          switch(wordAry[0]){
          case "/set":
            setBackground(wordAry[1]);
          break;
          case "/hide":
            setPlayerHide();
          break;
          case "/invisible":
            setPlayerInvisible();
          break;
          case "/visible":
            setPlayerVisible();
          break;
          case "/setplayersize":
            setPlayerSize(wordAry[1]);
          break;
          case "/goto":

          break;
          
          
          return false;
          }
          return false;
        }
        return true;
      }

      function setBackground(str){
        firebaseService.getAsset(str).$loaded(function(background){
            
  
            if (background.url){
              scope.world.background = background;
              scope.world.$save();
            }
          }
        , function(err){
          console.log("Errors Sad Day: ",err);
        })
      }

      function setPlayerPosition(x,y){
        scope.player.x = x;
        scope.player.y = y;
        scope.player.$save();
      }

      function setPlayerSize(newSize){
        if( isNumeric(newSize)){
          newSize = newSize*1;
          if (newSize>1){
            personSize = newSize;
            
            if (!scope.world.settings){
              scope.world.settings = {};
            }
            scope.world.settings.playerSize = newSize;
            scope.world.$save();
          }
        }
      }

      scope.canvasClick = function($event){
        //console.log("Single Click Event");
        var x = ($event.offsetX-canvas.offsetLeft)/(canvas.offsetWidth)*canvas.width - .5 *personSize;
        var y = ($event.offsetY-canvas.offsetTop)/(canvas.offsetHeight)*canvas.height - .5 *personSize;
        if (scope.player && !dragged){
          setPlayerPosition(x,y);
        }
      }

      scope.doubleClick = function($event){
        //console.log("Double Click Event");

        var x = ($event.offsetX-canvas.offsetLeft)/(canvas.offsetWidth)*canvas.width - .5 *personSize;
        var y = ($event.offsetY-canvas.offsetTop)/(canvas.offsetHeight)*canvas.height - .5 *personSize;
      }

      scope.mouseDown = function($event){
        //check to find player at location

        var x = ($event.offsetX-canvas.offsetLeft)/(canvas.offsetWidth)*canvas.width;
        var y = ($event.offsetY-canvas.offsetTop)/(canvas.offsetHeight)*canvas.height;
        dragged = false;
        draggedEvent.x = x;
        draggedEvent.y = y;
        draggedPlayer = findPlayerAt(x,y);
        //console.log(draggedPlayer);
      }

      scope.mouseUp = function($event){
        
        var x = ($event.offsetX-canvas.offsetLeft)/(canvas.offsetWidth)*canvas.width;
        var y = ($event.offsetY-canvas.offsetTop)/(canvas.offsetHeight)*canvas.height;
        if (Math.abs(x-draggedEvent.x)>10 || Math.abs(y-draggedEvent.y)>10){
          dragged = true;
         // console.log("Check Me");
        
    
            if (draggedPlayer){
            //console.log("hmmmmm");
            draggedPlayer.x = x - .5 *personSize;
            draggedPlayer.y = y - .5 *personSize;
            scope.world.$save();
            
          }
        }
        draggedPlayer = "";
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

      function findPlayerAt(x,y){
        for  (pi in scope.world.players ){
          player = scope.world.players[pi];
          if (player.x  < x && player.x + personSize  > x ){
            if (player.y -personSize/2 < y && player.y + personSize/2 > y ){
              return player;
            }
          }
        }
        return false;
      }

      function drawSquareGrid(){

        xOffset = scope.world.background.grid.xOffset%personSize;
        yOffset = scope.world.background.grid.yOffset%personSize;
        ctx.strokeStyle="2px solid black";
        for (var i=0;i<(1000+xOffset)/personSize;i++){
          ctx.beginPath()
          ctx.moveTo(i*personSize + xOffset,0);
          ctx.lineTo(i*personSize + xOffset,1000);
          ctx.stroke();
        }

        for (var i=0;i<(1000+yOffset)/personSize;i++){
          ctx.beginPath()
          ctx.moveTo(0,i*personSize + yOffset);
          ctx.lineTo(1000,i*personSize + yOffset);
          ctx.stroke();
        }
      }

      function drawHexGrid(){

        xOffset = scope.world.background.grid.xOffset%personSize;
        yOffset = scope.world.background.grid.yOffset%personSize ;

        ctx.strokeStyle="2px solid black";
        var line = personSize*.9;
        var flip = 1;
        //console.log("Here");
        do{

          for (var i=0;i<(1000+xOffset)/personSize;i++){
            drawHexAt(xOffset,yOffset + (i +flip/2)*Math.sqrt(3)*line, line);
          }
          xOffset+=1.5*line ;
          flip = 1-flip;
        }while (xOffset < 1000+personSize)

      }

      function drawHexAt(x,y,l){
        var s = Math.sqrt(3)/2*l;
        ctx.beginPath()
        ctx.moveTo(x-l,y);
        ctx.lineTo(x -l/2 ,y-s);
        ctx.lineTo(x +l/2 ,y-s);
        ctx.lineTo(x +l ,y);
        ctx.lineTo(x +l/2 ,y+s);
        ctx.lineTo(x -l/2 ,y+s);
        ctx.lineTo(x -l ,y);
        ctx.stroke();
        //console.log(x,y);
      }
    }
  }
})


