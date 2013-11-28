angular.module('eventHandlers',[])


.directive('scrollbarOnHover', function(){
  var width;
  return {
    transclude:true,
    template:'<div id="container" ng-transclude></div>',
    link:function(scope,elem,attr){
      width = width || $(elem).width();
      $(elem).on('mouseover', function(event){
        if (event.clientX > 1295){
          $(elem).width(width+16);
        }
        else {
          $(elem).width(width);
        }
      });
    }
  };
});