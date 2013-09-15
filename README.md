#[Glide.js](http://jedrzejchalubek.com/glide/)

Glide is responsive and touch-friendly jQuery slider. Based on CSS3 transitions with fallback to older broswers. It's simple, lightweight and fast. Designed to slide, no less, no more.

##Setup

###1. Include jQuery
jQuery is the only dependency. Make sure to include it.

	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>

###2. Include Glide.js
	<script src="jquery.glide.js"></script>

###3. Make necessary markup
Link to slider stylesheet inside document head.
	
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
Make necessary markup for slider.

    <div class="slider">
    	<ul class="slides">
    		<li class="slide"></li>
    		<li class="slide"></li>
    		<li class="slide"></li>
    	</ul>
    </div>

###4. Init
Init our slider on default options ...

	<script>
		$('.slider').glide();
	</script>
	
… or with custom options

	<script>
		$('.slider').glide({
			autoplay: 5000,
			arrows: 'body',
			nav: 'body'
		});
	</script>

##Options
Here is all list of averaible

| Option | Default | Type | Description
|-------|--------|-----|-----
| `autoplay` | `4000` | int/bool | False for turning off autoplay 
| `animationTime` | `500` | int | !!! That option will be use only, when css3 are not suported. If css3 are supported animation time is set in css transitions declaration inside .css file !!!
| `arrows` | `true` | bool/string | Show/hide/appendTo arrows. True for append arrows to slider wrapper. False for not appending arrows. Id or class name (e.g. '.class-name') for appending to specific HTML markup
| `arrowsWrapperClass` | `slider-arrows` | string | Arrows wrapper class
| `arrowMainClass` | `slider-arrow` | string | Main class for both arrows
| `arrowRightClass` | `slider-arrow--right` | string | Right arrow class
| `arrowLeftClass` | `slider-arrow--left` | string | Left arrow class
| `arrowRightText` | `next` | string | Right arrow text
| `arrowLeftText` | `prev` | string | Left arrow text
| `nav` | `true` | bool/string | Show/hide/appendTo bullets navigation. True for append arrows to slider wrapper. False for not appending arrows. Id or class name (e.g. '.class-name') for appending to specific HTML markup.
| `navCenter` | `true` | bool | Center bullet navigation
| `navClass` | `slider-nav` | string | Navigation wrapper class
| `navItemClass` | `slider-nav__item` | string | Navigation item class
| `navCurrentItemClass` | `slider-nav__item--current` | string | Current navigation item class
| `touchDistance` | `60` | int/bool | Minimal touch-swipe distance to call event. False for turning off touch.

##API

Make glide api instance.

	var glide = $('.slider').glide().data('api_glide');


Now, you can use API as bellow.

	glide.jump(3, console.log('Wooo!'));

- `.play()` - Starting autoplay
- `.pause()` - Stopping autoplay
- `.next(callback)` - Slide one forward
- `.prev(callback)` - Slide one backward
- `.jump(distance, callback)` - Jump to current slide
- `.current()` - Returning current slide number
- `.nav(target)` - Append navigation to specifed target (eq. 'body', '.class', '#id')
- `.arrows(target)` - Append arrows to specifed target (eq. 'body', '.class', '#id')


##Changelog
`1.0.3` / `15.09.2013`

- Code refactoring


`1.0.2` / `04.09.2013`

- Translate3d slides change (thanks to [OwlFonk](https://github.com/OwlFonk) for suggestion)
- Extend API, getter for current slide number


`1.0.1` / `22.08.2013`

- Modularize code
- Some options changes
- Extend API, manually appending navigation and arrows with specifed target

`1.0.0` / `19.08.2013`

- Plugin release