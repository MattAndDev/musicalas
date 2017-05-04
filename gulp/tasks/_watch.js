import gulp from 'gulp'
import clean from './clean'
import fonts from './fonts'
import images from './images'
import sass from './sass'
import sprite from './sprite'
import server from './server'
import twig from './twig'
import config from '../config'


gulp.task('watch',

  // Run base task
  // and start dev server
  gulp.series(
    'base',
    server
  ),

  // Sprite (svg) watcher
  gulp.watch(
    config.svgSprite.src,
    gulp.parallel(sprite)
  ),

  // Sass watcher
  gulp.watch(
    config.sass.srcAll,
    gulp.parallel(sass)
  ),

  // Images watcher
  gulp.watch(
    config.images.src,
    gulp.parallel(images)
  ),

  // Fonts watcher
  gulp.watch(
    config.fonts.src,
    gulp.parallel(fonts)
  ),

  // Twig watcher
  gulp.watch(
    [config.twig.src, config.twig.partialsGlob],
    gulp.parallel(twig)
  )
)
