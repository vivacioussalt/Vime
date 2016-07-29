var webpack = require('webpack');

module.exports = {
  entry: [
    __dirname + '/client/src/index.js',
    'whatwg-fetch'
  ],
  output: {
    path: __dirname + '/client/public',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: __dirname + '/client',
    port: 3000
  }
};

