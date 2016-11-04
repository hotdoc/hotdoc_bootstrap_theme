describe('parse_location', function() {
	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = "base/tests/js/snippets";  // path to your templates
		jasmine.getFixtures().load('index.html');   // load a template
	});	

	it('Testing extension retrieval', function() {
		expect(get_extension()).toBe('core');
	});
});
