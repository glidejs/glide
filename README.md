[![glide.js](//glide.jedrzejchalubek.com/images/glide-logotype.png)](//glide.jedrzejchalubek.com)

[Glide.js](//glide.jedrzejchalubek.com) is a responsive and touch-friendly vanilla JavaScript slider/carousel. It’s simple, lightweight and fast. Designed to slide. No less, no more.

[![Build Status](//api.travis-ci.org/jedrzejchalubek/glidejs.svg?branch=master)](//travis-ci.org/jedrzejchalubek/glidejs)

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
Available at: [glide.jedrzejchalubek.com/docs.html](//glide.jedrzejchalubek.com/docs.html)

## Contributing
The issue channel is especially for improvement proposals and bug reporting. If you have implementing problems, please write on StackOverflow with [glidejs](//stackoverflow.com/questions/tagged/glidejs) tag.

## Building
Build using NPM scripts. The following scripts are available:
- `build:css` (...)
- `build:js` (...)
- `build` (...)
- `test` (...)
- `lint` (...)

## License
Copyright (c) 2014-present, [Jędrzej Chałubek](//jedrzejchalubek.com). Licensed under the terms of the [MIT License](//opensource.org/licenses/MIT).
