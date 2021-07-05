const HtmlWebPack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",

  output: {
    clean: true,
    filename: "main.[contenthash].js",
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },

      {
        test: /\.css$/,
        exclude: /\styles.css/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: "file-loader",
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new HtmlWebPack({
      template: ".src/index.html",
      //filename: "./index.html",
      template: "./src/index.html",
    }),

    new MiniCssExtract({
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
  ],
};
