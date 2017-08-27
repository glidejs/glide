import build from './build'
import banner from './banner'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const settings = {
  output: Object.assign(build.output, {
    file: 'dist/glide.min.js'
  }),

  plugins: build.plugins.concat([
    uglify({
      output: {
        comments: '/^!/'
      }
    })
  ])
}

export default Object.assign(build, settings)