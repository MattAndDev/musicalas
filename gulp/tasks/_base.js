import gulp from 'gulp'
import clean from './clean'
import fonts from './fonts'
import images from './images'
import twig from './twig'
import sass from './sass'
import sprite from './sprite'
import server from './server'
import webpack from './webpack'



gulp.task('base', gulp.series(
  gulp.parallel(clean),
  gulp.parallel(fonts, images, sprite),
  gulp.parallel(twig, sass)
))
