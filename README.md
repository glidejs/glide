#[![glide.js](http://jedrzejchalubek.com/glide/images/slide-glide-github.png)](http://jedrzejchalubek.com/glide/)

[Glide.js](http://jedrzejchalubek.com/glide/) is responsive and touch-friendly jQuery slider. Based on CSS3 transitions with fallback to older browsers. It's simple, lightweight and fast. Designed to slide, no less, no more.

##Setup

###1. Include jQuery
jQuery is the only dependency. Make sure to include it.

``` html
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
```

###2. Include Glide.js

``` html
<script src="jquery.glide.js"></script>
```

###3. Make necessary markup
Link to slider stylesheet inside document head.

``` html
<link rel="stylesheet" href="css/style.css">
```

Make necessary markup for slider.

``` html
<div class="slider">
  <ul class="slider__wrapper">
    <li class="slider__item"></li>
    <li class="slider__item"></li>
    <li class="slider__item"></li>
  </ul>
</div>
```

###4. Init
Init our slider on default options ...

``` html
<script>
	$('.slider').glide();
</script>
```

… or with custom options

``` html
<script>
	$('.slider').glide({
		autoplay: 5000,
		arrows: 'body',
		navigation: 'body'
	});
</script>
```

##Options
Here is list of all available

| Option | Default | Type | Description
|--------|---------|------|------------
| `autoplay` | `4000` | int/bool | False for turning off autoplay
| `hoverpause` | `true` | bool | Pause autoplay on mouseover slider
| `circular` | `true` | bool | Circular play (Animation continues without starting over once it reaches the last slide)
| `animationDuration` | `500` | int | Animation time in ms
| `animationTimingFunc` | cubic-bezier(0.165, 0.840, 0.440, 1.000) | string | Animation easing function
| `arrows` | `true` | bool/string | Show/hide/appendTo arrows. True for append arrows to slider wrapper. False for not appending arrows. Id or class name (e.g. '.class-name') for appending to specific HTML markup
| `arrowsWrapperClass` | `slider__arrows` | string | Arrows wrapper class
| `arrowMainClass` | `slider__arrows-item` | string | Main class for both arrows
| `arrowRightClass` | `slider__arrows-item--right` | string | Right arrow class
| `arrowLeftClass` | `slider__arrows-item--left` | string | Left arrow class
| `arrowRightText` | `next` | string | Right arrow text
| `arrowLeftText` | `prev` | string | Left arrow text
| `navigation` | `true` | bool/string | Show/hide/appendTo bullets navigation. True for append bullets to slider wrapper. False for not appending bullets. Id or class name (e.g. '.class-name') for appending to specific HTML markup.
| `navigationCenter` | `true` | bool | Center bullet navigation
| `navigationClass` | `slider__nav` | string | Navigation wrapper class
| `navigationItemClass` | `slider__nav-item` | string | Navigation item class
| `navigationCurrentItemClass` | `slider__nav-item--current` | string | Current navigation item class
| `keyboard` | `true` | bool | Slide on left/right keyboard arrows press
| `touchDistance` | `60` | int/bool | Minimal touch-swipe distance to call event. False for turning off touch.
| `beforeInit` | `function(){}` | function | Callback before plugin init
| `afterInit` | `function(){}` | function | Callback after plugin init
| `beforeTransition` | `function(){}` | function | Callback before slide change
| `afterTransition` | `function(){}` | function | Callback after slide change

##API

Make glide api instance.

``` js
var glide = $('.slider').glide().data('api_glide');
```


Now, you can use API as bellow.

``` js
glide.jump(3, console.log('Wooo!'));
```

- `.current()` - Returning current slide number
- `.reinit()` - Rebuild and recalculate dimensions of slider elements
- `.destroy()` - Destroy and cleanup slider
- `.play()` - Starting autoplay
- `.pause()` - Stopping autoplay
- `.next(callback)` - Slide one forward
- `.prev(callback)` - Slide one backward
- `.jump(distance, callback)` - Jump to current slide
- `.nav(target)` - Append navigation to specifed target (eq. 'body', '.class', '#id')
- `.arrows(target)` - Append arrows to specifed target (eq. 'body', '.class', '#id')


##Changelog
`1.0.6` / `25.11.2014`
- Bower support


`1.0.6` / `12.07.2014`
- Sass styles redefined. New naming convection.
- Added destroy() method.

`1.0.6` / `01.02.2014`

- Code refactoring. More readable, modular, scalar.
- Added `circular` slides changing
- Rename `navigation` options, make sure to update.
- Refined `animation` options. Now setted via plugin options. There is no longer need to set transition inside css file.
- New api method .reinit(). Rebuild and recalculate dimensions of slider elements.

`1.0.5` / `25.11.2013`

- Added after and before transition callbacks
- Added after and before init callbacks
- Added `hoverpause` and `keyboard` options

`1.0.4` / `17.09.2013`

- Refined swipe event

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

##License
Glide is Copyright © 2013 [Jędrzej Chałubek](http://jedrzejchalubek.com) and is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
