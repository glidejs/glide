import transformer from './transformers/index'

export default function (Glide, Components) {
  let translate = Components.Dimensions.slideSize * Glide.index

  return transformer(Glide, Components).transform(translate)
}
