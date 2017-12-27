import build from './build.min'

export default Object.assign(build, {
  input: 'entry/entry-complete.js',
  output: Object.assign(build.output, {
    file: 'dist/glide.min.js',
    format: 'umd'
  })
})
