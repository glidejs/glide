export default class Focusing {
  transform (translate, Glide, Components) {
    let width = Components.Dimensions.width
    let focusAt = Glide.settings.focusAt
    let slideSize = Components.Dimensions.slideSize

    if (focusAt === 'center') {
      translate -= width / 2 - slideSize / 2
    }

    if (focusAt >= 0) {
      translate -= slideSize * focusAt
    }

    return translate
  }
}
