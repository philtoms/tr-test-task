describe( 'Filters', function() {

  beforeEach( module( 'tr.filters' ) );


  describe( 'titlize', function() {

    var titlize;
    beforeEach( inject( function( titlizeFilter ) {
      titlize = titlizeFilter;
    }));

    it( 'should titlize strings', function() {
      expect( titlize('abc') ).toBe('Abc');
      expect( titlize('a b c') ).toBe('A b c');
      expect( titlize('A b c') ).toBe('A b c');
      expect( titlize('a BC') ).toBe('A BC');
    });
  });

});
