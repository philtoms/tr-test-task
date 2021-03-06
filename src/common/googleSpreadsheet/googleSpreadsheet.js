angular.module('googleSpreadsheet',[])

.factory('TableDataContract', function() {
  return function(){
    this.headers = [];
    this.rows = [];
    this.index = {};
  };
})

.service('gsNotifier', function($rootScope, $timeout){
  var tid;
  // simulate a notification event - maybe use Google Drive Watch API later?

  function timeout()
  {
    tid = $timeout(function(){
      $rootScope.$broadcast('gsa data available');
      setTimeout(timeout);
    },5000);
  } 

  this.start= function(){
    if (!tid){
      timeout();
    }
  };

  this.stop = function(){
    $timeout.cancel(tid);
    tid=null;
  };
})

.factory ('gsMapper', function (TableDataContract) {

  return function(data, specialCase){
    var propertyKeys = [];
    var tableData = new TableDataContract();

    // ceate the header from row 0
    for (var key in data[0]) {
      if (key.indexOf('gsx$')===0) {
        propertyKeys.push(key);
        var header = specialCase[key] || key.replace('gsx$','');
        tableData.headers.push(header);
      }
    }

    angular.forEach(data,function(dataRow) {
      var row = {
        id:dataRow['id'].$t,
        updated:dataRow['updated'].$t,
        columns:[]
      };
      for (var i in propertyKeys) {
        var k = propertyKeys[i];
        row.columns.push({
          value:dataRow[k].$t,
          name:tableData.headers[i]
        });
      }
      tableData.rows.push(row);
      tableData.index[row.id]=row;
    });

    return tableData;
  };
})

.factory('GoogleSpreadsheet', function($http, $rootScope, gsNotifier, gsMapper, TableDataContract){

  var feedUrl = 'https://spreadsheets.google.com/feeds/{type}/{key}/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK';

  return function(key,type) {

    var data;
    var url = feedUrl.replace(/{key}/,key).replace(/{type}/,type);

    this.bindData = function(scope, cb) {
      var updated;
      if (!scope.table){
        scope.table = new TableDataContract();
        scope.table.headers = data.headers;
      }
      var table = scope.table;

      // update or add data rows
      angular.forEach(data.rows,function(row){
        if (table.index[row.id]){
          if (table.index[row.id].updated!=row.updated) {
            angular.extend(table.index[row.id],row);
            cb(row);
            updated=true;
          }
        }
        else {
          table.rows.push(row);
          table.index[row.id]=row;
          cb(row);
          updated=true;
        }
      });

      // remove end of life rows. 
      angular.forEach(table.rows,function(row){
        if (!data.index[row.id]){
          delete table.index[row.id];
          var rowIndex = table.rows.indexOf(row);
          table.rows.splice(rowIndex,1);
          updated=true;
        }
      });
      if (updated){
        $rootScope.$broadcast('gsa data updated');
      }
    };

    // load the data and start the notifier service
    getData();
    gsNotifier.start();
    $rootScope.$on('gsa data available', function(event){
      getData();
    });

    function getData(){
      $http.jsonp(url).then(
        function(response) {
          data = gsMapper(response.data.feed.entry, {'gsx$marketcap':'Market Cap'});
          $rootScope.$broadcast('new gsa data', data);
        },
        function(error) {
        });
    }
  };
})

.directive('googleSpreadsheet', function(){
  return {
    restrict:'E',
    replace:true,
    templateUrl:'googleSpreadsheet/googleSpreadsheet.tpl.html'
  };
});