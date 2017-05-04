'use strict'

import gulp from 'gulp'
import minifyCss from './minifyCss'
import minifyJs from './minifyJs'
import close from '../util/close'
import webpack from './webpack'

// Run this to compress all the things!
gulp.task('production', gulp.series(
  'base',
  gulp.parallel(webpack),
  gulp.parallel(minifyCss, minifyJs),
  close
))
