angular.module('tr.filters', [])

.filter('titlize', function() {
  return function(input) {
    if (!input) {
      return '';
    }
    input = input.replace(/\S+\//g,'');
    return input.charAt(0).toUpperCase() + input.slice(1).replace(/-/g,' ').replace(/\.html/,'').replace(/_/g,'-');
  };
});
