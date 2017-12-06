export default function (Glide, Components) {
  return {
    translate (translate) {
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
}
