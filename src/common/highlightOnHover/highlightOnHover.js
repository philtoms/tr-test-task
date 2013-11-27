angular.module('highlightOnHover',[])

.directive('highlightOnHover', function(){
  var currentFocus=$();
  var rows;
  return {
    link:function(scope,elem,attr){
      $(elem).on('mouseover','td', function(event){
        rows = rows || $(elem).find('tbody > tr');
        currentFocus.removeClass('highlight');
        currentFocus=$(this).parent();

        var index = $(this).prevAll().length;  
        var columns = rows.find(':nth-child(' + (index + 1) + ')');
        currentFocus = currentFocus.add(columns);
        currentFocus.addClass('highlight');

        scope.$on('gsa data updated', function(){
          currentFocus=null;
        });
      });
    }
  };
})

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