var app = angular.module("chatApp");

app.directive("movepiece", function(){
  return {
    scope:{/*dimensions:"="*/},
    transclude:true,
    templateUrl:"app/js/movepiece/movepiece_template.html",
    link:function(scope, elem, atts){
      if(!scope.dimensions){
        scope.dimensions = {x:0,y:0,width:100,height:100}
      }
      //scope.dimensions.x = scope.dimensions.x?scope.dimensions.x:0;
      //scope.dimensions.y = scope.dimensions.y?scope.dimensions.y:0;
            elem.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        if (event.offsetX<10&&event.offsetY <10){


        event.preventDefault();
        startX = event.pageX - scope.dimensions.x;
        startY = event.pageY - scope.dimensions.y;
        document.documentElement.addEventListener('mousemove', mousemove);
        document.documentElement.addEventListener('mouseup', mouseup);
        }
      });

      function mousemove(event) {
        scope.dimensions.y = event.pageY - startY;
        scope.dimensions.x = event.pageX - startX;
        elem.css({
          'top': scope.dimensions.y + 'px',
          'left':  scope.dimensions.x + 'px',
        });
      }

      function mouseup() {
        document.documentElement.removeEventListener('mousemove', mousemove);
        document.documentElement.removeEventListener('mouseup', mouseup);
      }
    }
  };
})