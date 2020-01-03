import Core from '../src/index'

// Required components
import Run from '../src/components/run'
import Gap from '../src/components/gap'
import Html from '../src/components/html'
import Peek from '../src/components/peek'
import Loop from '../src/components/loop'
import Size from '../src/components/size'
import Resize from '../src/components/resize'
import Layout from '../src/components/layout'
import Classes from '../src/components/classes'
import Direction from '../src/components/direction'
import Translate from '../src/components/translate'
import Animation from '../src/components/animation'

// Optional components
import Swipe from '../src/components/swipe'
import Images from '../src/components/images'
import Anchors from '../src/components/anchors'
import Controls from '../src/components/controls'
import Keyboard from '../src/components/keyboard'
import Autoplay from '../src/components/autoplay'
import Breakpoints from '../src/components/breakpoints'

const COMPONENTS = {
  // Required
  Html,
  Peek,
  Gap,
  Size,
  Layout,
  Run,
  Translate,
  Loop,
  Animation,
  Direction,
  Resize,
  Classes,

  // Optional
  Swipe,
  Images,
  Anchors,
  Controls,
  Keyboard,
  Autoplay,
  Breakpoints
}

export default class Glide extends Core {
  mount (extensions = {}) {
    return super.mount(Object.assign({}, COMPONENTS, extensions))
  }
}
