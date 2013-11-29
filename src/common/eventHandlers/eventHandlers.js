angular.module('eventHandlers',[])

.directive('highlightOnHover', function(){
  var currentFocus=$();
  var currentFocusAll=$();
  var curColumnIndex;
  var rows;
  function clear(elem){
    if (elem){
      elem.removeClass('highlight');
    }
  }
  function set(elem){
    elem.addClass('highlight');
  }
  return {
    link:function(scope,elem,attr){
      $(elem).on('mouseover','td', function(event){
        clear(currentFocus);
        currentFocus=$(this).parent();
        var index = $(this).prevAll().length;  
        if (index==curColumnIndex){
          set(currentFocus);
        }
        else {
          clear(currentFocusAll);
          rows = rows || $(elem).find('tbody > tr');
          var columns = rows.find(':nth-child(' + (index + 1) + ')');
          currentFocusAll = currentFocus.add(columns);
          set(currentFocusAll);
        }
      });
      $(elem).on('mouseleave', function(event){
        clear(currentFocusAll);
      });
      scope.$on('gsa data updated', function(){
        clear(currentFocusAll);
        currentFocus=null;
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
        if (!$(event.target).prevAll().length){
          $(elem).width(width+16);
        }
        else {
          $(elem).width(width);
        }
      });
    }
  };
});
