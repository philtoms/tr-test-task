
angular.module( 'trTestTask', [
  'templates-app',
  'templates-common',
  'tr.home',
  'tr.preview',
  'tr.filters',
  'googleSpreadsheet',
  'highlightOnHover',
  'typeSorter',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/preview' );
})

.run( function run (  ) {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, GoogleSpreadsheet, typeSorter) {
  var sheet = new GoogleSpreadsheet('0Am2JQtBtFqZwdDRFem5qZUR3ZHZ0VjZ5VFpOWkVuT0E', 'list');

  // data has come in. Make sure its new data before binding it to scope
  $scope.$on('new gsa data', function(event){
    sheet.bindData($scope);
  });
  $scope.sortBy = function(index,reverse){
    $scope.active=index;
    typeSorter($scope.table.rows, index, reverse);
  };
})

.directive('x-circles', function(){

  function random(limit){
    return Math.floor(Math.random()*limit+1);
  }

  function draw(canvas, context){
    var x = random(canvas.width);
    var y = random(canvas.height);
    var radius = random(10);

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#333';
    context.fill();
  }

  return {link:function(){
      var canvas = document.getElementsByTagName('canvas')[0];
      var context = canvas.getContext('2d');
      for (var i=0;i<30;i++){
        draw(canvas, context);
      }
    }
  };
})
;
