const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': path.resolve(helpers.SOURCE_PATH, 'polyfills.ts'),
    'vendor': path.resolve(helpers.SOURCE_PATH, 'vendor.ts'),
    'app': path.resolve(helpers.SOURCE_PATH, 'main.ts')
  },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('tsconfig.json'),
              useCache: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  let plugins = [
                    require('precss'),
                    require('autoprefixer')(helpers.AUTOPREFIXER_CONF)
                  ];
                  if (process.env.NODE_ENV === 'production')
                    plugins.push(require('cssnano')());
                  return plugins;
                },
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                relativeUrls: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.SOURCE_PATH, // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
