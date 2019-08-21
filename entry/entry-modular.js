import Core from '../src/index'

import Run from '../src/components/run'
import Gaps from '../src/components/gaps'
import Html from '../src/components/html'
import Peek from '../src/components/peek'
import Move from '../src/components/move'
import Sizes from '../src/components/sizes'
import Build from '../src/components/build'
import Clones from '../src/components/clones'
import Resize from '../src/components/resize'
import Direction from '../src/components/direction'
import Translate from '../src/components/translate'
import Transition from '../src/components/transition'

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
  Translate,
  Transition,
  Direction,
  Peek,
  Sizes,
  Gaps,
  Move,
  Clones,
  Resize,
  Build,
  Run
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
