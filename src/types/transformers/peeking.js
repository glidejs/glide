export default class Peeking {
  transform (translate, Glide, Components) {
    if (Glide.settings.focusAt >= 0) {
      translate -= Components.Peek.value / 2
    }

    return translate
  }
}
