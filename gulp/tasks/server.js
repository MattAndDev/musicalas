import browserSync from 'browser-sync'
import gulp from 'gulp'
import config from '../config'
import webpack from 'webpack'
import getWebpackConfig from '../util/getWebpackConfig'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// ============================================
// Server task
// ============================================
//  Dev server with browserSync
// ============================================

function server () {
  const wpConfig = getWebpackConfig('watch')
  const bundler = webpack(wpConfig)
  config.browserSync.middleware = [
    webpackDevMiddleware(bundler, {
      publicPath: wpConfig.output.publicPath,
      stats: 'minimal',
      hot: true
    }),
    webpackHotMiddleware(bundler)
  ]

  browserSync(config.browserSync)
}

// Description
server.displayName = 'server'
server.description = 'Starts dev server'

// Export
export default server
