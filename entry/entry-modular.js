import Core from '../src/index'

import Run from '../src/components/run'
import Gap from '../src/components/gap'
import Html from '../src/components/html'
import Peek from '../src/components/peek'
import Loop from '../src/components/loop'
import Sizes from '../src/components/sizes'
import Resize from '../src/components/resize'
import Layout from '../src/components/layout'
import Classes from '../src/components/classes'
import Direction from '../src/components/direction'
import Translate from '../src/components/translate'
import Animation from '../src/components/animation'

import Swipe from '../src/components/swipe'
import Images from '../src/components/images'
import Anchors from '../src/components/anchors'
import Controls from '../src/components/controls'
import Keyboard from '../src/components/keyboard'
import Autoplay from '../src/components/autoplay'
import Breakpoints from '../src/components/breakpoints'

// Utilities
import { throttle } from '../src/utils/wait'

const COMPONENTS = {
  Html,
  Peek,
  Gap,
  Sizes,
  Translate,
  Animation,
  Direction,
  Resize,
  Layout,
  Classes,
  Run,
  Loop
}

export {
  Swipe,
  Images,
  Anchors,
  Controls,
  Keyboard,
  Autoplay,
  Breakpoints,
  throttle
}

export default class Glide extends Core {
  mount (extensions = {}) {
    return super.mount(Object.assign({}, COMPONENTS, extensions))
  }
}
