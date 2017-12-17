import transformer from './transformers/index'

export default function (Glide, Components) {
  const mutator = transformer(Glide, Components)

  let index = Glide.index
  let slideWidth = Components.Dimensions.slideWidth
  let slidesLength = Components.Html.slides.length

  if (Components.Run.isOffset('<')) {
    Components.Run.flag = false

    Components.Animation.after(() => {
      Components.Transition.disable()
      Components.Translate.set(mutator.transform(slideWidth * (slidesLength - 1)))
    })

    return mutator.transform(-slideWidth)
  }

  if (Components.Run.isOffset('>')) {
    Components.Run.flag = false

    Components.Animation.after(() => {
      Components.Transition.disable()
      Components.Translate.set(mutator.transform(0))
    })

    return mutator.transform(slideWidth * slidesLength)
  }

  return mutator.transform(slideWidth * index)
}
