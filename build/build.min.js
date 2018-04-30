import build from './build'
import uglify from 'rollup-plugin-uglify'

export default Object.assign(build, {
  plugins: build.plugins.concat([
    uglify({
      output: {
        comments: '/^!/'
      },
      compress: {
        drop_console: true
      }
    })
  ])
})
