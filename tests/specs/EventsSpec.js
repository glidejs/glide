jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Events", function() {

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

	});

	it("Disable events", function() {
		Glide.Events.disable();
		expect(Glide.Events.disabled).toEqual(true);
	});

	it("Enable events", function() {
		Glide.Events.enable();
		expect(Glide.Events.disabled).toEqual(false);
	});

	it("Disable, enable, call should return Glide.Events object", function() {
		expect(Glide.Events.enable()).toEqual(Glide.Events);
		expect(Glide.Events.disable()).toEqual(Glide.Events);
		expect(Glide.Events.call(function(){})).toEqual(Glide.Events);
	});

});
