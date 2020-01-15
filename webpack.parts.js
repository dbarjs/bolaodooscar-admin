const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

exports.devServer = ({ host } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    hot: true,
    open: true,
    overlay: true,
  },
});

exports.loadHtmlFile = mode => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Bolão do Oscar - Admin",
      template: "src/index.html",
    }),
  ],
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            compact: false,
          },
        },
      },
    ],
  },
});

exports.loadVueFiles = () => ({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new VuetifyLoaderPlugin()],
});

exports.loadStyles = mode => ({
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("postcss-preset-env"),
                require("postcss-google-color"),
              ],
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("postcss-preset-env"),
                require("postcss-google-color"),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
});
