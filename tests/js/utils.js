describe('core index', function() {
	var hd_context;

	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = "base/tests/js/snippets";
		jasmine.getFixtures().load('index.html');
		hd_context = new utils.HDContext('http://test.com/doc/index.html');
	});

	it('Testing extension', function() {
		expect(hd_context.extension).toBe('core');
	});

	it('Testing hotdoc basename', function() {
		expect(hd_context.hd_basename).toBe('index.html');
	});

	it('Testing hotdoc root', function() {
		expect(hd_context.hd_root).toBe('http://test.com/doc/');
		hd_context = new utils.HDContext('http://test.com/doc/index.html#foo');
		expect(hd_context.hd_root).toBe('http://test.com/doc/');
	});
});

describe('gi index', function() {
	var hd_context;

	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = "base/tests/js/snippets";
		jasmine.getFixtures().load('gi-index.html');
		hd_context = new utils.HDContext('http://test.com/doc/c/gi-index.html');
	});

	it('Testing extension', function() {
		expect(hd_context.extension).toBe('gi-extension');
	});

	it('Testing language', function() {
		expect(hd_context.gi_language).toBe('c');
		expect(hd_context.gi_languages).toEqual(['c', 'python', 'javascript']);
	});

	it('Testing hotdoc root', function() {
		expect(hd_context.hd_root).toBe('http://test.com/doc/');
	});
});

describe('misc utils', function() {
	it('Testing uri in same page', function() {
		parsedUri = utils.parseUri('http://test.com/doc/index.html');
		expect(utils.uri_is_in_page(parsedUri, 'http://test.com/doc/index.html')).toBe(true);
		expect(utils.uri_is_in_page(parsedUri, 'index.html')).toBe(true);
		expect(utils.uri_is_in_page(parsedUri, 'index.html#foo')).toBe(true);
		expect(utils.uri_is_in_page(parsedUri, '#foo')).toBe(true);
		expect(utils.uri_is_in_page(parsedUri, 'http://test2.com/doc/index.html#foo')).toBe(false);
		expect(utils.uri_is_in_page(parsedUri, 'http://test.com/doc2/index.html#foo')).toBe(false);
		expect(utils.uri_is_in_page(parsedUri, 'index2.html#foo')).toBe(false);
	});
});
