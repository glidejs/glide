jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';
jasmine.getJSONFixtures().fixturesPath = '../tests/fixtures/json';

describe("Core", function() {

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
		loadStyleFixtures('glide.css');

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

		options = {
			startAt: 2,
			padding: 0
		};

		api = slider.glide(options).data('glide_api');

	});

	it("Track width value should be width of slide * number of slides", function() {
		expect(track.width()).toEqual(
			track.children().eq(0).width() * track.children().length
		);
	});

	it("Slide width should be width of slider", function() {
		expect(slides.eq(0).width()).toEqual(slider.width());
	});

	it("Start slide should have class active", function() {
		expect(slides.eq(options.startAt - 1)).toHaveClass('active');
	});

	it("Slider should start at second slide", function() {
		expect(slides.index($(data.active)) + 1).toEqual(options.startAt);
	});

});
