jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Glide", function() {

	var slider;
	var api;

	beforeEach(function () {
		loadFixtures('base.html');
		loadStyleFixtures('glide.css');
	});

	it("Glide init should return Api", function() {
		expect(Glide.init($('.glide'), {})).toEqual(Glide.Api.instance());
	});

});
