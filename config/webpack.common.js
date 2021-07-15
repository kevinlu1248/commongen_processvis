const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname + '/../src/index'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname + '/../public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tx|tsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CommonGen ',
      inject: 'body',
      templateContent: ({ htmlWebpackPlugin }) => `
<html>
  <head>
    <title>
      Load visualizer for CommonGen image scraping
    </title>
    ${htmlWebpackPlugin.tags.headTags}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
          `,
    }),
  ],
};
