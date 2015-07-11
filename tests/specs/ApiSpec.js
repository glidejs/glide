jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';
jasmine.getJSONFixtures().fixturesPath = '../tests/fixtures/json';

describe("Api", function() {

	var data;
	var fixtures;
	var slider;
	var wrapper;
	var track;
	var slides;
	var arrows;
	var bullets;
	var glide;
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

		options = {
			animationDuration: 10,
			autoplay: 200,
		};

		glide = slider.glide(options);
		api = glide.data('glide_api');

		arrows = slider.find(data.arrows).children();
		bullets = slider.find(data.bullets).children();
		index = slides.index($(data.active)) + 1;

	});


	it("Api.current should return index of active slide", function(done) {
		setTimeout(function(){
			api.go('>');
			setTimeout(function(){
				expect(api.current()).toEqual(slides.index($(data.active)) + 1);
				done();
			}, options.animationDuration*5);
		}, options.animationDuration*5);
	});


	it("Api.go('>') should move slide one forward", function(done) {
		setTimeout(function(){

			api.go('>');

			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toEqual(index + 1);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('>>') should scroll slider to the end (last element)", function(done) {

		setTimeout(function(){

			api.go('>>');

			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toEqual(slides.length);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);

	});


	it("Api.go('<') should move slide one backward", function(done) {
		setTimeout(function(){

			api.go('<');

			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toEqual(slides.length);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('<<') should scroll slider to start (first element)", function(done) {

		setTimeout(function(){

			api.go('=' + slides.length);

			setTimeout(function(){

				api.go('<<');

				setTimeout(function(){
					expect(slides.index($(data.active)) + 1).toEqual(1);
					done();
				}, options.animationDuration*5);

			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('=3') should move slide to third slide", function(done) {
		setTimeout(function(){

			api.go('=3');

			setTimeout(function(){
				expect(slides.index($(data.active)) + 1).toEqual(3);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.pause should stop autoplay", function() {
		api.play();
		expect(api.pause()).toBeUndefined();
	});


	it("Api.play should start autoplay", function(done) {
		api.pause();
		api.play();
		setTimeout(function(){
			expect(api.play()).toBeTruthy();
			done();
		}, options.autoplay + 10);
	});


	it("Api.destroy should clear object and unbind events", function() {
		api.destroy();
		expect(glide.data('glide_api')).toBeUndefined();
		expect(typeof $._data(arrows[0], "events")).toBe('undefined');
		expect(typeof $._data(bullets[0], "events")).toBe('undefined');
		expect(typeof $._data(track[0], "events")).toBe('undefined');
	});

});
