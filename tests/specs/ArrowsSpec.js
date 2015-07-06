jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';
jasmine.getJSONFixtures().fixturesPath = '../tests/fixtures/json';

describe("Arrows", function() {

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
			animationDuration: 10
		};

		api = slider.glide(options).data('glide_api');

	});

	it("Arrows should have binded click event", function() {
		var spyEvent = spyOnEvent(arrows.eq(0), 'click');
		arrows.eq(0).click();
		expect('click').toHaveBeenTriggeredOn(arrows.eq(0));
		expect(spyEvent).toHaveBeenTriggered();
	});

	it("Click on next arrow should change slide to next", function(done) {

		var current = slides.index($(data.active)) + 1;

		setTimeout(function(){
			arrows.filter(data.arrowNext).click();
			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toBe(current + 1);
				done();
			}, options.animationDuration*10);
		}, options.animationDuration*10);

	});

	it("Click on prev arrow should change slide to prev", function(done) {

		var current = slides.index($(data.active)) + 1;

		setTimeout(function(){
			arrows.filter(data.arrowPrev).click();
			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toBe(slides.length);
				done();
			}, options.animationDuration*10);
		}, options.animationDuration*10);

	});

});
