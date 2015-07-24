jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';
jasmine.getJSONFixtures().fixturesPath = '../tests/fixtures/json';

describe("Height", function() {

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
		loadStyleFixtures('glide.theme.css');
		loadStyleFixtures('glide.core.css');

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
			autoheight: true,
			animationDuration: 20
		};

		slides.eq(0).find('div').height(111);
		slides.eq(1).find('div').height(222);
		slides.eq(2).find('div').height(333);
		slides.eq(3).find('div').height(444);

		api = slider.glide(options).data('glide_api');

	});


	it("On init wrapper should have height of first slide", function(done) {

		setTimeout(function(){
			expect(wrapper.height()).toEqual(111);
			done();
		}, options.animationDuration*5);

	});


	it("On slide change wrapper should have height of current slide", function(done) {

		setTimeout(function(){
			arrows.filter(data.arrowNext).click();
			setTimeout(function(){
				expect(wrapper.height()).toEqual(222);
				done();
			}, options.animationDuration*5);
		}, options.animationDuration*5);

	});


});
