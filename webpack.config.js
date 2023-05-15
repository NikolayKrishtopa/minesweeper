const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const mode = env.mode || 'development';
  const PORT = env.port || 8080;
  return {
    entry: {
      main: './minesweeper/pages/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '',
    },
    mode,
    devServer:
      mode === 'development'
        ? {
            static: path.resolve(__dirname, 'shelter', 'dist'),
            open: true,
            compress: true,
            port: PORT,
          }
        : undefined,
    devtool: mode === 'development' ? 'inline-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: '/node_modules/',
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './minesweeper/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
  };
};
