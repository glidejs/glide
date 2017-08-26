import babel from 'rollup-plugin-babel';

export default {
  input: 'src/Glide.js',
  output: {
    file: 'dist/glide.js',
    format: 'umd'
  },
  plugins: [
    babel()
  ]
};