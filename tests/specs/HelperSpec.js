jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Helper", function() {


	var slider;
	var api;
	var helper;


	beforeEach(function () {
		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		helper = new Helper();
	});


	it("Capitalise passed string", function() {
		expect(helper.capitalise('hello')).toEqual('Hello');
	});


});
