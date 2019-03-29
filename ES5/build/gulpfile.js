var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var fs     = require('fs')
var path   = require('path')
var del    = require('del')
var colors = require('colors')
var child_process = require('child_process')
var through = require('through2')

var pkg  = require('./package.json')
var banner = `/*!
  * ${pkg.name}
  * @version ${pkg.version}
  * @link ${pkg.homepage}
  * @license ${pkg.license}
  */`

/**
 * 复制文件
 */
gulp.task('copyFiles', () => {
  return gulp.src([
    '../src/**/*',
    // '!../src/**/*.js',
    '!../src/{views,views/**}',
  ])
    .pipe(gulp.dest('../dist'))
})

/**
 * 合并svg图标，并转为成js脚本
 */
var svgTransformScript = () => {
  return through.obj(function(file, enc, cb) {
    file.contents = new Buffer(`
      (function () {
        var isReady = false;
        document.onreadystatechange = function () {
          if (isReady) { return false; }
          if (document.readyState === 'interactive' || document.readyState === 'complete') {
            isReady = true;
            // 添加svg元素节点
            var div = document.createElement('div');
            div.innerHTML = '${file.contents.toString().replace(/\n/g, '')}';
            var svg = div.getElementsByTagName('svg')[0];
            if (svg) {
              svg.setAttribute('aria-hidden', 'true');
              svg.style.overflow = 'hidden';
              var firstChild = document.body.firstChild;
              if (firstChild) {
                firstChild.parentNode.insertBefore(svg, firstChild);
              } else {
                document.body.appendChild(el);
              }
            }
          }
        };
      })();
    `)
    cb(null, file)
  })
}
gulp.task('svg', () => {
  return gulp.src(['./icons/svg/**/*.svg'])
    .pipe($.svgSprites({
      mode: 'symbols',
      preview: false
    }))
    .pipe(svgTransformScript())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify({ mangle: { toplevel: true }}))
    .on('error', (e) => {
      $.util.log($.util.colors.red('[Error]'), e.toString())
    })
    .pipe($.rename('icon-svg.js'))
    .pipe(gulp.dest('../src/icons'))
})

/**
 * 样式
 */
gulp.task('styles', () => {
  return gulp.src(['./styles/skins/*.scss'])
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: pkg['element-theme'].browsers,
      cascade: false
    }))
    .pipe($.header(banner))
    .pipe($.rename({ prefix: 'ra-' }))
    .pipe(gulp.dest('../src/assets/styles'))
    .pipe($.cleanCss())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('../src/assets/styles'))
})

/**
 * requirejs合并打包
 */
gulp.task('scripts', () => {
  return gulp.src(['../src/**/*.js', '!../src/assets/**', '!../src/icons/**'])
    .pipe($.requirejsOptimize({
      ...require('../src/config.js'),
      ...{
        baseUrl: '../src',
        optimize: 'none',
        skipModuleInsertion: true,
        stubModules: ['text'],
        removeCombined: true
      }
    }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    // .pipe($.uglify({ mangle: { toplevel: true }}))
    .on('error', (e) => {
      $.util.log($.util.colors.red('[Error]'), e.toString())
    })
    .pipe(gulp.dest('../dist'))
})

/**
 * 监听
 */
gulp.task('watch', () => {
  gulp.watch(['./icons/svg/**/*.svg'], ['svg'])
  gulp.watch(['./styles/**/*.{scss,css}'], ['styles'])
})

/**
 * 创建element主题
 */
gulp.task('create-element-theme', () => {
  var et               = require('element-theme')
  var etOptions        = pkg['element-theme']
  var themeList        = require('../src/skins.json').filter(item => !item.hasBuild)
  var themeFileDir     = etOptions.out.replace(/(.*\/)[^\/]+/, '$1')
  var variablesDirTemp = etOptions.config.replace(/(.*\/)(.+)(\.scss)/, '$1$2-temp$3')

  if (themeList.length <= 0) {
    return del.sync(variablesDirTemp)
  }

  // 删除临时文件，保证本次操作正常执行
  del.sync(variablesDirTemp, { force: true })

  // 拷贝一份scss样式文件夹，作为构建的临时处理文件夹
  child_process.spawnSync('cp', ['-r', etOptions.config, variablesDirTemp])

  // 开始构建生成
  fnCreate(themeList)

  function fnCreate (themeList) {
    if (themeList.length >= 1) {
      console.log('\n')
      console.log(colors.green('-------------------- 待构建，主题 -------------------------'))
      console.log(themeList)
      console.log('\n')
      console.log(colors.green('-------------------- 构建中，主题 -------------------------'))
      console.log(themeList[0])
      console.log('\n')

      // 修改variables-element-temp.scss文件中的$--color-primary主题变量值
      var data = fs.readFileSync(variablesDirTemp, 'utf8')
      var result = data.replace(/\$--color-primary:(.*) !default;/, `$--color-primary:${themeList[0].color} !default;`)
      fs.writeFileSync(path.resolve(variablesDirTemp), result)

      // 调用element-theme插件，生成element组件主题
      etOptions.config = variablesDirTemp
      etOptions.out = `${themeFileDir}/${themeList[0].name}`
      et.run(etOptions, () => {
        themeList.splice(0, 1)
        fnCreate(themeList)
      })
    } else {
      // 删除临时文件
      del.sync(variablesDirTemp, { force: true })
      console.log('\n')
      console.log(colors.green('-------------------- 构建完毕，删除临时文件 -------------------------'))
      console.log(variablesDirTemp)
      console.log('\n')

      // 删除主题不需要的部分文件
      var files = [
        `${themeFileDir}/**/*.css`,
        `!${themeFileDir}/**/index.css`,
        `!${themeFileDir}/**/fonts`
      ]
      del.sync(files, { force: true })
      console.log(colors.green('-------------------- 构建完毕，删除主题多余文件 -------------------------'))
      console.log(files)
      console.log('\n')
    }
  }
})

gulp.task('serve', () => {
  gulp.start(['watch'])
})

gulp.task('build', () => {
  del.sync(['./dist/**'])
  gulp.start(['copyFiles', 'scripts'])
})
