import transformer from './transformers/index'
import { emit } from '../core/event/events-bus'

/**
 * Provide a transform value of the `carousel` type glide.
 *
 * @param  {Glide}  Glide
 * @param  {Object} Components
 * @return {Number}
 */
export default function (Glide, Components) {
  const mutator = transformer(Glide, Components)

  let slideWidth = Components.Sizes.slideWidth
  let slidesLength = Components.Html.slides.length

  if (Components.Run.isOffset('<')) {
    Components.Transition.after(() => {
      emit('carousel.jumping', {
        movement: mutator.transform(slideWidth * (slidesLength - 1))
      })
    })

    return mutator.transform(-slideWidth)
  }

  if (Components.Run.isOffset('>')) {
    Components.Transition.after(() => {
      emit('carousel.jumping', {
        movement: mutator.transform(0)
      })
    })

    return mutator.transform(slideWidth * slidesLength)
  }

  return mutator.transform(slideWidth * Glide.index)
}
