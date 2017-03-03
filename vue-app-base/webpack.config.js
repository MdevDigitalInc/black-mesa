// BlackMesa - Vue Base App 
// Webpack 2 Configuration file
// -----------------------------------------
// Lucas Moreira - l.moreira@live.ca
// -----------------------------------------
//
// TODO ------------------------------------
//
// 2- Setup DB
// 3- Setup Authentication
// ----------------------------------------
//
// CRITICAL TODO - DEPLOYMENT ------------
//
// 1- Server MUST be setup to serve [ index.html ]
// on all requests and allow Vue to route.

// Require Imports
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

// Module Exports
module.exports = {
  // Asset Splitting [ Vendor | Build ]
  entry: {
    build: './src/main.js',
    vendor: [
      'vue',
      'vue-i18n',
      'vue-resource',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'app/[name][hash].js'
  },
  // Module Rules & Loaders
  module: {
    rules: [
      // Vue Linting
      {
        enforce: 'pre',
        test: /\.vue$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      // Template Processing
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              loader: 'css-loader?-autoprefixer!sass-loader!postcss-loader',
              fallbackLoader: 'vue-style-loader'
            })
          },
          // Must have postcss require autoprefixer for @import's to get piped.
          postcss: [
            require('postcss-cssnext')()
          ]
        }
      },
      // JavaScript Processing
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      // Image Processing
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]?[hash]'
            }
          },
          // Image Compression
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 9,
              interlaced: false,
              // .png
              pngquant: {
                quality: '85-90',
                speed: 4
              },
              // .jpg/jpeg
              mozjpeg: {
                quality: 90
              },
              // .svg
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 2
              }
            }
          }
        ]
      }
    ]
  },
  // Plugins & Post Processing
  plugins: [
    // Auto Prefix & Linting
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ]  } }),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    // Text Extraction & Chunking
    new ExtractTextPlugin("assets/styles/styles[hash].css"),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/main-logo.png',
      prefix: 'icons-[hash]/',
      emitStats: false,
      persistentCache: true,
      inject: true,
      background: '#2f2f2f',
      title: '[ Black Mesa ]',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === 'production') {
  // Require Compression Plugin for Gzip
  const CompressionPlugin = require("compression-webpack-plugin");
  
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // Gzip Compression
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: '/search',
          crawDelay: 2
        },
        {
          userAgent: '*',
          allow: '/',
          disallow: '/search',
          crawDelay: 10
        }
      ],
      sitemap: 'http://host.com/sitemap.xml',
      host: 'http://host.com'
    })
  ])
}
