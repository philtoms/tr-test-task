angular.module('eventHandlers',[])

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
});
