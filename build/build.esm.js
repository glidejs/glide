import build from './build'

const settings = {
  output: Object.assign(build.output, {
    file: 'dist/glide.esm.js',
    format: 'es'
  })
}

export default Object.assign(build, settings)
