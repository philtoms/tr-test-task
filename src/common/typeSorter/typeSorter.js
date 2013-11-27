angular.module('typeSorter', [])

.factory('typeSorter', function(){

  return function(array,index,reverse){

    function toType(v) {
      var type = {
        'v':v,
        't':typeof v
      };
      if (type.t == 'string'){
        var n = parseInt(v.replace(/,/g,''),10);
        if(!isNaN(n)){
          type.v = n;
        }
        else {
          if (v.length>1){
            var v1=v.substr(1);
            if (!isNaN(v1)){
              return toType(v1);
            }
          }
          type.v = v.toLowerCase();
        }
      }
      type.t = typeof type.v;
      return type;
    }

    function typeSort(v1,v2){

      v1 = v1.columns[index];
      v2 = v2.columns[index];

      var result;
      var t1 = toType(v1);
      var t2 = toType(v2);
      if (t1.t == t2.t) {
        if (t1.v === t2.v) {return 0;}
        result = t1.v < t2.v ?  -1 : 1;
      } else {
        result = t1.t < t2.t ?  -1 : 1;
      }
      if (reverse){
        result = result===1? -1 : 1;
      }
      return result;
    }

    array.sort(typeSort);
  };

});