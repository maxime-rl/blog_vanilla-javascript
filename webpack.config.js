// npm run webpack pour build
// npm start pour serveur virtuel
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    form: path.join(__dirname, "src/form/form.js"), // déclaration d'un nouveau point d'entrer
    topbar: path.join(__dirname, "src/assets/javascripts/topbar.js") // on peut également déclarer un fichier js
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/img/*',
          to: "assets/img",
          flatten: true // récupération des images sans récupérer le path
        }
      ]
  }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar"] // le fait de déclarer topbar dans index et form va permettre au navigateur de le conserver dans le cache
    }),
    new HtmlWebpackPlugin({ 
      filename: 'form.html',
      template: path.join(__dirname, "./src/form/form.html"),
      chunks: ["form", "topbar"]
    })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    contentBase: "./dist",
    inline: true,
    port: 4000
  }
};