[![glide.js](//glide.jedrzejchalubek.com/images/glide-logotype.png)](//glide.jedrzejchalubek.com)

[Glide.js](//glide.jedrzejchalubek.com) is a dependency-free JavaScript ES6 slider and carousel. It’s simple, lightweight and fast. Designed to slide. No less, no more.

What can convince you:
- **Dependency-free**. Everything included, ready for action.
- Lightweight. Only **~18kb (~6kb gzipped)** with every function on board.
- **Modular**. Remove unused modules and drop script weight even more.
- **Extendable**. Plug-in your own modules with additional functions.
- **Bundlers ready**. Using Rollup or Webpack? We have your back.

[![Build Status](//api.travis-ci.org/jedrzejchalubek/glidejs.svg?branch=3.0.0)](//travis-ci.org/jedrzejchalubek/glidejs)

## Documentation

Available at: http://glide.jedrzejchalubek.com/docs

## Getting started

Pull-in a latest version with NPM ...

```bash
npm install glidejs
```

... provide `<link>` to the required core stylesheet. You can also optionally add an included theme stylesheet ...

```html
<!-- Required Core stylesheet -->
<link rel="stylesheet" href="node_modules/glidejs/dist/css/glide.core.min.css">

<!-- Optional Theme stylesheet -->
<link rel="stylesheet" href="node_modules/glidejs/dist/css/glide.theme.min.css">
```

... then, prepare a little bit of necessary markup ...

```html
<div class="glide">
  <div data-glide="track" class="glide__track">
    <ul class="glide__slides">
      <li class="glide__slide"></li>
      <li class="glide__slide"></li>
      <li class="glide__slide"></li>
    </ul>
  </div>
</div>
```

... and finally, initialize and mount a Glide.

```js
import Glide from 'glidejs'

new Glide('.glide').mount()
```

Need a few selected modules? Import and mount only what you need.

```js
import { Glide, Controls, Breakpoints } from 'glidejs/dist/glide.modular.esm'

new Glide('.glide').mount({ Controls, Breakpoints })
```

## Contributing

The issue channel is especially for improvement proposals and bug reporting. If you have implementing problems, please write on StackOverflow with [glidejs](//stackoverflow.com/questions/tagged/glidejs) tag.

## Building

Build using NPM scripts. The following scripts are available:
- `build:css` - Outputs CSS files from SASS files.
- `build:js` - Outputs all destination variants of the script.
- `build` - Comprehensively builds the entire library.
- `test` - Runs complete test suite.
- `lint` - Lints library JavaScript files.

## License

Copyright (c) 2014-present, [Jędrzej Chałubek](//jedrzejchalubek.com). Licensed under the terms of the [MIT License](//opensource.org/licenses/MIT).
