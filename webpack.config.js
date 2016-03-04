var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,  
  entry: {app:'./js/index'},
  output: {filename:'./built/[name].js',path:'./'},
  resolve: {
    extensions: ['','.ts', '.js','.tsx','.scss']
  },
  plugins: [
    new ExtractTextPlugin('./built/[name].css')
  ],
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss?$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader") }
    ]
  }
}