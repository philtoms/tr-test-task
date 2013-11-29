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

.controller( 'AppCtrl', function AppCtrl ( $scope) {
})

;
