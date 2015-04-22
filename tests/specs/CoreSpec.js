jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Core", function() {

	var slider;
	var wrapper;
	var slides;
	var arrows;
	var bullets;
	var options;

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		options = {
			startAt: 2
		};

		wrapper = $('.glide').children('.glide__wrapper');
		slides = wrapper.children();
		slider = $('.glide').glide(options);
		arrows = slider.children('.glide__arrows').children();
		bullets = slider.children('.glide__bullets').children();

	});

	it("Wrapper width value should be width of slide * number of slides", function() {
		expect(wrapper.width()).toEqual($('.glide__wrapper').children().eq(0).width() * $('.glide__wrapper').children().length);
	});

	it("Slide width should be width of slider", function() {
		expect(slides.eq(0).width()).toEqual(slider.width());
	});

	it("Start slide should have class active", function() {
		expect(slides.eq(options.startAt - 1)).toHaveClass('active');
	});

	it("Slider should start at second slide", function() {
		expect(slides.index($('.active')) + 1).toEqual(options.startAt);
	});

});
