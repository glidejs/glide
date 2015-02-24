jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Helper", function() {


	var slider;
	var api;


	beforeEach(function () {
		loadFixtures('base.html');
		loadStyleFixtures('glide.css');
	});


	it("Capitalise passed string", function() {
		expect(Glide.Helper.capitalise('hello')).toEqual('Hello');
	});


	it("Check for number", function() {
		expect(Glide.Helper.isNumber(4)).toEqual(true);
		expect(Glide.Helper.isNumber('>')).toEqual(false);
	});


});
