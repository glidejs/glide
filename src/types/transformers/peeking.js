export default function (Glide, Components) {
  return {
    translate (translate) {
      if (Glide.settings.focusAt >= 0) {
        let peek = Components.Peek.value

        if (typeof peek === 'object') {
          translate -= peek.before
        } else {
          translate -= peek
        }
      }

      return translate
    }
  }
}
