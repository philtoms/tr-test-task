/*
 * This is an e2e test suite.
 */
describe( 'tr-test-task', function() {
  var url = '/base/build/index.html';
  describe( 'smoke test', function() {

    it( 'initial state', function () {
      // Trigger state change: Load page
      browser().navigateTo(url);

      // Check Title, rendered HTML and templates have all loaded
      expect(element('title').text()).toContain('DataGrid Control Panel');
    });
  });
});