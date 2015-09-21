jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';
jasmine.getJSONFixtures().fixturesPath = '../tests/fixtures/json';

describe("Paddings", function() {

	var data;
	var fixtures;
	var slider;
	var wrapper;
	var track;
	var slides;
	var arrows;
	var arrowsWrapper;
	var bullets;
	var bulletsWrapper;
	var api;

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.core.css');
		loadStyleFixtures('glide.theme.css');

		data = getJSONFixture('data.json');
		fixtures = loadJSONFixtures('data.json');
		data = fixtures['data.json'];

		slider = $(data.base);
		wrapper = slider.find(data.wrapper);
		track = wrapper.find(data.track);
		slides = track.children();
		arrowsWrapper = slider.find(data.arrows);
		arrows = arrowsWrapper.children();
		bulletsWrapper = slider.find(data.bullets);
		bullets = bulletsWrapper.children();

	});

	it("Check padding size entered with num", function() {
		api = slider.glide({ paddings: 100 });

		expect(
			(slider.width() - slides.eq(0).width())/2
		).toEqual(100);
	});

	it("Check padding size entered with px", function() {
		api = slider.glide({ paddings: '100px' });

		expect(
			(slider.width() - slides.eq(0).width())/2
		).toEqual(100);
	});

	it("Check padding size entered with %", function() {
		api = slider.glide({ paddings: '10%' });
		var value = Math.round( (slider.width() * 10)/100 );

		expect(
			(slider.width() - slides.eq(0).width())/2
		).toEqual(value);
	});

});
