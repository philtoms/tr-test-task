describe('typeSorter', function() {

  function buildData(){
    var data= [];
    for(var i=0; i< arguments.length; i++){
      data.push({columns:[{value:arguments[i]}]});
    }
    return data;
  } 
  var $rootScope, typeSorter;

  beforeEach(module('typeSorter'));

  beforeEach( inject(function(_$rootScope_, _typeSorter_){
    $rootScope = _$rootScope_;
    typeSorter = _typeSorter_;
  }));

  it ('should sort numbers', function(){
    var unsorted = buildData(3,1,2);
    var sorted = buildData(1,2,3);

    typeSorter(unsorted,0,false);
    expect(unsorted).toEqual(sorted);
  });

  it ('should reverse sort numbers', function(){
    var unsorted = buildData(3,1,2);
    var sorted = buildData(3,2,1);

    typeSorter(unsorted,0,true);
    expect(unsorted).toEqual(sorted);
  });

  it ('should reverse sort formatted numbers', function(){
    var unsorted = buildData('-3,000','101.7',2);
    var sorted = buildData('101.7',2,'-3,000');

    typeSorter(unsorted,0,true);
    expect(unsorted).toEqual(sorted);
  });

  it ('should sort trailing alpha numbers', function(){
    var unsorted = buildData('3%','-1.4%','1.4%', '1.2%');
    var sorted = buildData('-1.4%','1.2%','1.4%','3%');

    typeSorter(unsorted,0,false);
    expect(unsorted).toEqual(sorted);
  });

  it ('should sort leading alpha numbers', function(){
    var unsorted = buildData('£3','£1','£2');
    var sorted = buildData('£1','£2','£3');

    typeSorter(unsorted,0,false);
    expect(unsorted).toEqual(sorted);
  });

  it ('should reverse sort leading alpha numbers', function(){
    var unsorted = buildData('£3','£1','£2');
    var sorted = buildData('£3','£2','£1');

    typeSorter(unsorted,0,true);
    expect(unsorted).toEqual(sorted);
  });

  it ('should sort strings', function(){
    var unsorted = buildData('ABC','GHI','DEF');
    var sorted = buildData('ABC','DEF','GHI');

    typeSorter(unsorted,0,false);
    expect(unsorted).toEqual(sorted);
  });

});