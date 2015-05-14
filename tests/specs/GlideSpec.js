jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Glide", function() {

	var glide;
	var api;

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		glide = new Glide($('.glide'), {});

	});

	it("Glide init should return object", function() {
		expect(typeof glide).toEqual('object');
	});

});
