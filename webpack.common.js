const path = require('path');
const Swal = require('sweetalert2');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.woff$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            dependency: { not: ['url'] },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/styles/notepad.png',
      outputPath: 'assets/favicons',
      prefix: 'assets/favicons/',
      inject: true,
      favicons: {
        icons: {},
      },
    }),
  ],
};
