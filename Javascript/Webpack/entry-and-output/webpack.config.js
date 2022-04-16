const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  }
}