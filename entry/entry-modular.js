import Core from '../src/index'

import Run from '../src/components/run'
import Html from '../src/components/html'
import Peek from '../src/components/peek'
import Build from '../src/components/build'
import Clones from '../src/components/clones'
import Resize from '../src/components/resize'
import Movement from '../src/components/movement'
import Translate from '../src/components/translate'
import Transition from '../src/components/transition'
import Dimensions from '../src/components/dimensions'

import Swipe from '../src/components/swipe'
import Height from '../src/components/height'
import Images from '../src/components/images'
import Anchors from '../src/components/anchors'
import Controls from '../src/components/controls'
import Keyboard from '../src/components/keyboard'
import Autoplay from '../src/components/autoplay'

const COMPONENTS = {
  Html,
  Translate,
  Transition,
  Dimensions,
  Movement,
  Peek,
  Clones,
  Resize,
  Build,
  Run
}

export { Swipe }
export { Height }
export { Images }
export { Anchors }
export { Controls }
export { Keyboard }
export { Autoplay }

export default class Glide extends Core {
  mount (extensions = {}) {
    super.mount(Object.assign(COMPONENTS, extensions))
  }
}
