import build from './build'

export default Object.assign(build, {
  input: 'entry/entry-modular.js',
  output: Object.assign(build.output, {
    file: 'dist/glide.modular.esm.js',
    format: 'es'
  })
})
