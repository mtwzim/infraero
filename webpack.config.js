const path = require('path');

module.exports = {
  entry: './lib/infraero-promise.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [],
          },
        },
      },
    ],
  },
};
