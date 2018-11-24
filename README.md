[![glide.js](https://glidejs.com/images/glidejs-logotype-dark.png)](https://glidejs.com)

### [Glide.js](https://glidejs.com) is a dependency-free JavaScript ES6 slider and carousel. It’s lightweight, flexible and fast. Designed to slide. No less, no more

[![Build Status](https://api.travis-ci.org/glidejs/glide.svg?branch=master)](https://travis-ci.org/glidejs/glide)

What can convince you:
- **Dependency-free**. Everything included, ready for action.
- Lightweight. Only **~23kb (~7kb gzipped)** with every functionality on board.
- **Modular**. Remove unused modules and drop script weight even more.
- **Extendable**. Plug-in your own modules with additional functionalities.
- **Bundlers ready**. Using Rollup or Webpack? We have your back.

## Documentation

Visit [glidejs.com](https://glidejs.com/docs) for documentation.

> Looking for old documentation? [Wiki](https://github.com/glidejs/glide/wiki) contains archived documentation of Glide.js in version `^2.0.0`.

## Donation

Glide.js is an open source project licensed under the MIT license. It's completely free to use. However, it would be great if you buy me a cup of coffee once in a while to keep me awake :)

- [PayPal](https://www.paypal.me/jedrzejchalubek)
- Bitcoin (BTC) - `3LS37Xzyiwthmi73GeBrFXcYzJkbV32k4o`
- Ether (ETH) - `0xB5a1272b14fB4d794bdEaaC72ea9520c8D9fC74A`
- Litecoin (LTC) - `MA9o1Tcj6VDwKGg1ez4yPngAhTcy988c2S`

## Getting started

Pull-in a latest version with NPM ...

```bash
npm install @glidejs/glide
```

... provide `<link>` to the required core stylesheet. You can also optionally add an included theme stylesheet ...

```html
<!-- Required Core stylesheet -->
<link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.core.min.css">

<!-- Optional Theme stylesheet -->
<link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.theme.min.css">
```

... then, prepare a little bit of necessary markup ...

```html
<div class="glide">
  <div data-glide-el="track" class="glide__track">
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
import Glide from '@glidejs/glide'

new Glide('.glide').mount()
```

Need a few selected modules? Import and mount only what you need.

```js
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'

new Glide('.glide').mount({ Controls, Breakpoints })
```

## Contributing

The issue channel is especially for improvement proposals and bug reporting. If you have implementing problems, please write on StackOverflow with [glidejs](https://stackoverflow.com/questions/tagged/glidejs) tag.

## Browser Support

 - IE 11+
 - Edge
 - Chrome 10+
 - Firefox 10+
 - Opera 15+
 - Safari 5.1+
 - Safari iOS 9+

## Building

Build using NPM scripts. The following scripts are available:
- `build:css` - Outputs CSS files from SASS files.
- `build:js` - Outputs all destination variants of the script.
- `build` - Comprehensively builds the entire library.
- `test` - Runs complete test suite.
- `lint` - Lints library JavaScript files.

## Credits

- [Jędrzej Chałubek](https://github.com/jedrzejchalubek) - Creator
- [Contributors](../../contributors)

## License

Copyright (c) 2014-present, [Jędrzej Chałubek](https://jedrzejchalubek.com). Licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
