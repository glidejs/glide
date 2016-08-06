jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Run", function() {

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

		loadFixtures('single.html');
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

		options = {
			animationDuration: 10
		};

		api = slider.glide(options).data('glide_api');

	});

	it("Glide should not slide if there is only one slide", function(done) {
		api.go('>');

		setTimeout(function(){
			var current = slides.index($(data.active)) + 1;

			expect(current).toBe(1);

			done();
		}, options.animationDuration*10);
	});

	it("If there is only one slide arrows should be disabled", function() {
		var next = arrows.filter(data.arrowNext);
		var prev = arrows.filter(data.arrowPrev);

		expect(next.hasClass('disabled')).toBe(true);
		expect(prev.hasClass('disabled')).toBe(true);
	});

});
