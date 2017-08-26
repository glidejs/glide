import build from './build'
import banner from './banner'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const settings = {
  output: {
    file: 'dist/glide.min.js',
    format: 'umd',
    banner
  },
  plugins: [
    babel(),
    uglify({
      output: {
        comments: '/^!/'
      }
    })
  ]
}

export default Object.assign(build, settings)