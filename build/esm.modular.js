import build from './build'

export default Object.assign(build, {
  input: 'entry/entry-modular.js',
  output: Object.assign(build.output, {
    file: 'dist/glide.esm.modular.js',
    format: 'es'
  })
})
