const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

module.exports = {
  entry: {
    app: './src/app.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
      '/backend': {
        target: `http://localhost:${config.PORT}`,
        secure: false,
      },
    },
  },
};
