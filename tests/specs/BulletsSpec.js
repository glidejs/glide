jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Bullets", function() {

	var slider;
	var bullets;
	var bulletsWrapper;

	beforeEach(function () {

		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		options = {
			animationDuration: 10
		};

		wrapper = $('.glide').children('.glide__wrapper');
		slides = wrapper.children();
		slider = $('.glide').glide(options);
		bulletsWrapper = slider.children('.glide__bullets');
		bullets = bulletsWrapper.children();

	});

	it("Number of bullets should be equal number of slides", function() {
		expect(bullets.length).toBe(slides.length);
	});

	it("First bullet should have class active", function() {
		expect(bullets.eq(0)).toHaveClass('active');
	});

	it("Bullets should have binded click event", function() {
		var spyEvent = spyOnEvent(bullets.eq(0), 'click');
		bullets.eq(0).click();
		expect('click').toHaveBeenTriggeredOn(bullets.eq(0));
		expect(spyEvent).toHaveBeenTriggered();
	});

	it("Click on bullet should change slide to his index", function(done) {
		var bullet = bullets.eq(2);
		var dir = bullet.data('glide-dir');
		var index = parseInt(dir.substr(1));

		setTimeout(function(){
			bullet.click();
			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toBe(index);
				done();
			}, 50);
		}, 50);
	});

});
