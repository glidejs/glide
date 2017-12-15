import build from './build'
import uglify from 'rollup-plugin-uglify'

const settings = {
  output: Object.assign(build.output, {
    file: 'dist/glide.min.js'
  }),

  plugins: build.plugins.concat([
    uglify({
      output: {
        comments: '/^!/'
      },
      compress: {
        drop_console: true,
        pure_funcs: 'warn'
      }
    })
  ])
}

export default Object.assign(build, settings)
