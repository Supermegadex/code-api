const path = require('path');

module.exports = {
  entry: './test/src/test.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/www')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};
