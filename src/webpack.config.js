// import path from "path";
const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/, // whenever we find .scss files..
        use: ExtractCSS.extract([
          // use this plugin -> ExtractCSS
          {
            loader: "css-loader", // once the compatible .css is loaded, we extract it to somewhere..
          },
          {
            loader: "postcss-loader", // takes that .css and transforms it with plugins we give
            options: {
              plugins() {
                return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader", // takes .scss and convert to .css
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
