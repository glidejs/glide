export default function (Glide, Components) {
  return {
    translate (translate) {
      if (Glide.settings.focusAt >= 0) {
        translate -= Components.Peek.value / 2
      }

      return translate
    }
  }
}
