var app = angular.module("chatApp");

app.directive("worldInspector", function(){
  return {
    templateUrl:"app/js/worldInspector/world_inspector_template.html",
    scope:{world:"=", selectedPlayer:"=", selectPlayer:"&"},
    link:function(scope, elem, atts){

      //scope.selectPlayer(scope.selectedPlayer);
    }
  }
});