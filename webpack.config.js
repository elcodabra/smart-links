const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');

module.exports = {
  entry: {
    app: './src/components/app.jsx',
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
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets/favicon.ico',
      to: './assets/favicon.ico',
    }]),
    new ExtractTextPlugin('styles.css'),
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
