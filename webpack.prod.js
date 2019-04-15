// MDEV Digital - Webpack Boilerplate[VueJS]
// Webpack 4 Configuration file
// -----------------------------------------
// PRODUCTION ENVIRONMENT
// ----------------------------------------

// Require Imports
var webpack = require('webpack');
var path = require('path')
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
//
// Webpack Merge Configuration
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin");

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

// Robots.TXT Configuration
// TODO - Update robots.txt for Staging & Production
// While dev is being done switch to NO CRAWL
const robotOptions = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/search"],
      crawlDelay: 2
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
      cleanParam: "ref /articles/"
    }
    ],
    sitemap: "http://example.com/sitemap.xml",
    host: "http://example.com"
}

// Module Exports
module.exports = merge(common, {
  // Set Webpack Mode
  mode: 'production',
  // Plugins & Post Processing
  plugins: [
    // Clean ./dist Folder
    new CleanWebpackPlugin('dist', {} ),
    // Generate Robots.TXT
    new RobotstxtPlugin(robotOptions),
    // Set NODE_ENV to Production
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true,}, reduceIdents: false, discardDuplicates: false, autoprefixer: false },
      canPrint: true
    }),
    // Process and Inject Favicon
    new FaviconsWebpackPlugin({
      // TODO - Make sure Favicon is the correct one for the project
      logo: './src/assets/images/favicon.png', // Source for Favicon file
      prefix: 'icons-[hash]/', // File Prefix
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true, // Inject Calls on index.html automatically
      // TODO - Update Theme color for background
      background: '#13b2a9',
      // TODO - Update Title based on project
      title: 'MDEV Digital Inc.',
      // Icons to export
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
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        // TODO - Add desired prerender routes
        '/',
      ],

      renderer: new Renderer({
        headless: true,
        renderAfterDocumentEvent: 'spa-rendered'
      })
    }),

    // Gzip Compression
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
