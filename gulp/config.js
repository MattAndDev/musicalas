import path from 'path'

const dest = path.resolve('./dist')
const src = path.resolve('./src')

export default {


  destFolder: dest,


  // ==============================
  // browserSync.js settings
  // ==============================

  browserSync: {
    port: 9000,
    server: {
      // Serve up our build folder
      baseDir: dest
    },
    notify: false,
    open: false,
    files: [
      dest + '/css/*',
      dest + '/js/*',
      dest + '*.html'
    ]
  },


  // ==============================
  // fonts.js settings
  // ==============================

  fonts: {
    src: src + '/fonts/**',
    dest: dest + '/fonts'
  },



  // ==============================
  // images.js settings
  // ==============================

  images: {
    src: src + '/images/**',
    dest: dest + '/images',

    // gulp-imagemin settings
    options: {
    }
  },

  // ==============================
  // markup.js settings
  // ==============================

  twig: {
    src: src + '/twig/templates/*.twig',
    dest: dest + '/',
    partialsGlob: src + '/twig/**/*.twig'
  },


  // ==============================
  // _production.js settings
  // ==============================


  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest,
    cssDest: dest + '/css',
    jsDest: dest + '/js'
  },


  // ==============================
  // sass.js settings
  // ==============================

  sass: {
    src: src + '/sass/*.{sass,scss}',
    srcAll: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/css',

    // postcss-autoprefixer settings

    prefix: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ],

    // gulp-sass settings
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images', // Used by the image-url helper,
      // add external dependencies
      includePaths: [
        './node_modules/normalize.css'
      ]
    }
  },

  // ==============================
  // sprite.js settings
  // ==============================


  svgSprite: {
    src: src + '/icons/*.svg',
    dest: dest + '/images',
    config: {
      shape: {
        id: {
          generator: 'i-%s'
        }
      },
      mode: {
        symbol: {
          sprite: 'sprite.svg',
          dest: '.',
          render: {
            scss: {
              template: 'gulp/tpl/_sprite-inline.scss',
              dest: '../../src/sass/base/sprite.scss'
            }
          }
        }
      }
    },
    svgMin: {
      plugins: [
        { removeTitle: true },
        { removeDesc: true },
        { removeStyle: true },
        { removeAttrs: { attrs: '(fill|stroke|style)' } }
      ]
    }
  },

  webpack: {
    context: `${src}/js`,
    entry: {
      // Path relative to `context`
      main: ['./app.js']
    },
    output: {
      filename: '[name].js',
      path: `${dest}/js`,
      // Path on server
      publicPath: '/js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015'],
                plugins: ['transform-class-properties']
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js',
        utils: `${src}/js/utils`,
        components: `${src}/js/components`,
        views: `${src}/js/views`,
        settings: `${src}/js/utils/settings`,
        env: `${src}/js/env`,
        store: `${src}/js/store`
      }
    }
  }

}
