Glide can be adjusted with various options. Pass an object as an argument while initializing a new instance of `Glide`.

```js
new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3
})
```

## Reference

#### `type`

Type of the movement. Available types:
- `slider` - Rewinds slider to the start/end when it reaches first or last slide.
- `carousel` - Changes slides without starting over when it reaches first or last slide.

**default:** `'slider'`

**type:** `String`

---

#### `startAt`

Start at specific slide number defined with zero-based index.

**default:** `0`

**type:** `Number`

---

#### `perView`

A number of slides visible on the single viewport.

**default:** `1`

**type:** `Number`

---

#### `focusAt`

Focus currently active slide at a specified position in the track. Available inputs:
- `center` - Current slide will be always focused at the center of a track.
- `(1,2,3...)` - Current slide will be focused on the specified zero-based index.

**default:** `center`

**type:** `String|Number`

---

#### `autoplay`

Change slides after a specified interval. Use `false` for turning off autoplay.

**default:** `4000`

**type:** `String|Number`

---

#### `hoverpause`

Stop autoplay on mouseover event.

**default:** `true`

**type:** `Boolean`

---

#### `keyboard`

Allow for changing slides with left and right keyboard arrows.

**default:** `true`

**type:** `Boolean`

---

#### `swipeThreshold`

Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.

**default:** `80`

**type:** `Number|Boolean`

---

#### `dragThreshold`

Minimal mouse drag distance needed to change slide. Use `false` for turning off a dragging.

**default:** `120`

**type:** `Number|Boolean`

---

#### `perTouch`

A maximum number of slides to whom movement is made on swiping or dragging. Use `false` for unlimited.

**default:** `false`

**type:** `Number|Boolean`

---

#### `touchRatio`

Moving distance ratio of the slides on a swiping and dragging.

**default:** `0.75`

**type:** `Number`

---

#### `touchAngle`

Angle required to activate slides moving on swiping or dragging.

**default:** `45`

**type:** `Number`

---

#### `animationDuration`

Duration of the animation in milliseconds.

**default:** `400`

**type:** `Number`

---

#### `animationTimingFunc`

Easing function for the animation.

**default:** `'cubic-bezier(0.165, 0.840, 0.440, 1.000)'`

**type:** `String`

---

#### `throttle`

Throttle costly events at most once per every wait milliseconds.

**default:** `25`

**type:** `Number`

---

#### `autoheight`

Set height of the slider based on current slide content.

**default:** `false`

**type:** `Boolean`

---

#### `rtl`

Switch to "right to left" moving mode.

**default:** `false`

**type:** `Boolean`

---

#### `peek`

Distance value of the next and previous viewports which have to be peeked in current view. Accepts number and pixels as string. Left and right peeking can be setup separetly with a directions object. For example:
- `100`, `'100'`, `'100px'` - Peek 100px on the both sides.
- `{ left: 100, right: 50 }` - Peek 100px on the left side and 50px on the right side.

**default:** `0`

**type:** `Number|String|Object`

---

#### `breakpoints`

Collection of options applied at specified media breakpoints. For example, display two slides per view under 800px:
```
`{
  '800px': {
    perView: 2
  }
}`
```

**default:** `{}`

**type:** `Object`

---

#### `classes`

Collection of internally used HTML classes.

**default:** 

```
{
  rtl: 'glide--rtl',
  slider: 'glide--slider',
  carousel: 'glide--carousel',
  swipeable: 'glide--swipeable',
  dragging: 'glide--dragging',
  cloneSlide: 'glide__slide--clone',
  activeNav: 'glide__bullet--active',
  activeSlide: 'glide__slide--active',
  disabledArrow: 'glide__arrow--disabled'
}
```
**type:** `Object`