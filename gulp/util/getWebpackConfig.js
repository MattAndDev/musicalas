/* eslint import/no-extraneous-dependencies: 0 */

import config from '../config.js'
import webpack from 'webpack'

module.exports = (env) => {
  if (!config.webpack.plugins) {
    config.webpack.plugins = []
  }

  if (env === 'build') {
    config.webpack.devtool = 'inline-source-map'
  }

  if (env === 'watch') {
    config.webpack.devtool = 'inline-source-map'

    Object.keys(config.webpack.entry).forEach((key) => {
      const entry = config.webpack.entry[key]
      config.webpack.entry[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry)
    })

    config.webpack.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }

  if (env === 'prod') {
    config.webpack.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return config.webpack
}
