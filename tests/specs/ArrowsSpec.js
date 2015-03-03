jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Arrows", function() {

	var slider;
	var wrapper;
	var slides;
	var arrows;
	var arrowsWrapper;
	var options;

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		options = {
			animationDuration: 10
		};

		wrapper = $('.glide').children('.glide__wrapper');
		slides = wrapper.children();
		slider = $('.glide').glide(options);
		arrowsWrapper = slider.children('.glide__arrows');
		arrows = arrowsWrapper.children();
	});

	it("Arrows should have binded click event", function() {
		var spyEvent = spyOnEvent(arrows.eq(0), 'click');
		arrows.eq(0).click();
		expect('click').toHaveBeenTriggeredOn(arrows.eq(0));
		expect(spyEvent).toHaveBeenTriggered();
	});

	it("Click on next arrow should change slide to next", function(done) {
		var next = arrowsWrapper.find('.next');
		var current = slides.index($('.active')) + 1;

		setTimeout(function(){
			next.click();
			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toBe(current + 1);
				done();
			}, options.animationDuration*5);
		}, options.animationDuration*5);

	});

	it("Click on prev arrow should change slide to prev", function(done) {
		var prev = arrowsWrapper.find('.prev');
		var current = slides.index($('.active')) + 1;

		setTimeout(function(){
			prev.click();
			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toBe(slides.length);
				done();
			}, options.animationDuration*5);
		}, options.animationDuration*5);
	});

});
