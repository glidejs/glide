[![glide.js](http://glide.jedrzejchalubek.com/images/glide-logotype.png)](http://glide.jedrzejchalubek.com)

[Glide.js](http://glide.jedrzejchalubek.com) is a responsive and touch-friendly JavaScript slider/carousel. It’s simple, lightweight and fast. Designed to slide. No less, no more.

[![Build Status](https://api.travis-ci.org/jedrzejchalubek/glidejs.svg?branch=master)](https://travis-ci.org/jedrzejchalubek/glidejs)

## Getting started

```html
<div id="Glide" class="glide">
  <div data-glide="track" class="glide__track">
    <ul class="glide__slides">
      <li class="glide__slide">1</li>
      <li class="glide__slide">2</li>
      <li class="glide__slide">3</li>
    </ul>
  </div>
</div>
```

```js
new Glide('#glide', {
  type: 'carousel'
})
```

## Documentation
Available at: http://glide.jedrzejchalubek.com/docs.html

## Contributing
The issue channel is especially for improvement proposals and bug reporting. If you have implementing problems, please write on StackOverflow with [glidejs](http://stackoverflow.com/questions/tagged/glidejs) tag.

## Building
Build using NPM scripts. The following scripts are available:
- `build:css` (...)
- `build:js` (...)
- `build` (...)
- `test` (...)

## License
Copyright (c) 2014-present, [Jędrzej Chałubek](http://jedrzejchalubek.com). Licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
