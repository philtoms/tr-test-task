/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'tr.preview', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'preview', {
    url: '/preview',
    views: {
      "main": {
        controller: 'PreviewCtrl',
        templateUrl: 'preview/preview.tpl.html'
      }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'PreviewCtrl', function PreviewController( $scope, GoogleSpreadsheet, typeSorter ) {
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

