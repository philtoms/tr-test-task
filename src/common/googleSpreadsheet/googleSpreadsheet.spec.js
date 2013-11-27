describe('googleSpreadsheet', function() {

  var $rootScope,$httpBackend, GoogleSpreadsheet;
  var testFeed = '// API callback  ' +
                 'x({"feed":{"entry":[{"gsx$ticker":{"$t":"ACXM"},"gsx$industry":{"$t":"Information Technology Services"},"gsx$marketcap":{"$t":"1754.84"},"gsx$price":{"$t":"£23.95"},"gsx$change":{"$t":"0.55%"},"gsx$volume":{"$t":"114570"}},{"gsx$ticker":{"$t":"ADBE"},"gsx$industry":{"$t":"Application Software"},"gsx$marketcap":{"$t":"23170.76"},"gsx$price":{"$t":"£46.61"},"gsx$change":{"$t":"1.26%"},"gsx$volume":{"$t":"808302"}}]}});';

  beforeEach(module('googleSpreadsheet'));

  beforeEach( inject(function(_$rootScope_,_$httpBackend_, _GoogleSpreadsheet_){
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('https://spreadsheets.google.com/feeds/list/0Am2JQtBtFqZwdDRFem5qZUR3ZHZ0VjZ5VFpOWkVuT0E/od6/public/values?alt=json-in-script&callback=x').respond(testFeed);
    GoogleSpreadsheet = _GoogleSpreadsheet_;
  }));

  xit ('should load the data feed', function(){
    var sheet = new GoogleSpreadsheet('0Am2JQtBtFqZwdDRFem5qZUR3ZHZ0VjZ5VFpOWkVuT0E','list');

    expect(sheet.data).toBeDefined();
    $httpBackend.flush();
    var dataStr;
    sheet.data.then(function(data){
      console.log(data.replace(/'\/\/ API callback'.*\((.*)\)/,'$1'));
    });
  });

});