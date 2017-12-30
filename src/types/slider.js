import transformer from './transformers/index'

/**
 * Provide a transform value of the `slider` type glide.
 *
 * @param  {Glide}  Glide
 * @param  {Object} Components
 * @return {Number}
 */
export default function (Glide, Components) {
  let translate = Components.Sizes.slideWidth * Glide.index

  return transformer(Glide, Components).transform(translate)
}
