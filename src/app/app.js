angular.module( 'trTestTask', [
  'templates-app',
  'templates-common',
  'tr.home',
  'tr.preview',
  'tr.filters',
  'googleSpreadsheet',
  'eventHandlers',
  'typeSorter',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/preview' );
})

.run( function run (  ) {
  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, GoogleSpreadsheet, typeSorter) {
  var sheet = new GoogleSpreadsheet('0Am2JQtBtFqZwdDRFem5qZUR3ZHZ0VjZ5VFpOWkVuT0E', 'list');

  // data has come in. Make sure its new data before binding it to scope
  $scope.$on('new gsa data', function(event){
    sheet.bindData($scope, function(row){
      var change = row.columns[4];
      change.class = change.value.indexOf('-')<0? "positiveValue":"negativeValue";
    });
  });
  $scope.active=0;
  $scope.sortBy = function(index,reverse){
    $scope.active=index;
    $scope.activeUp=reverse;
    typeSorter($scope.table.rows, index, reverse);
  };
})

;
