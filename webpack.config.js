const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  favicon: "./src/yegenetics_lined.svg",
  filename: "./index.html",
});
const copyPlugin = new CopyPlugin({
  patterns: [
    { from: path.resolve(__dirname, 'src', 'assets','images'), to: path.resolve(__dirname, 'public', 'assets','images') }
  ]
})

module.exports = {
  mode: "development",
  devtool: 'inline-source-map', //For seeing error messages from the entry files
  devServer: {                  //Whenever a data changes in public compile and hot reload
    static: './src',
  },
  optimization: {               //Necessary for devServer
    runtimeChunk: 'single',
  },
  entry: {                      //entry of js files which might have exports
    index: "./src/index.js",
  },
  output: {                     //output of the exports to create a new file for public path
    filename: '[name]-production.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,                //every compilation clean old necessity files
  },
  module: {
    rules:
      [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
          // options: {
          //   publicPath: 'assets',
          // },
        },
        {
          test: /\.(png|jpg|ico|svg)$/,
          type: 'asset/resource'
        }

      ]
  },
  plugins: [htmlPlugin,copyPlugin]
};