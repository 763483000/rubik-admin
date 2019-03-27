const gulp   = require('gulp');
const $      = require('gulp-load-plugins')();
const fs     = require('fs');
const path   = require('path');
const del    = require('del');
const colors = require('colors');
const child_process = require('child_process');

const pkg  = require('./package.json')
const banner = `/*!
  * ${pkg.name}
  * @version ${pkg.version}
  * @link ${pkg.homepage}
  * @license ${pkg.license}
  * 
  * Vue ${require('./node_modules/vue/package.json').version}
  * Element-ui ${require('./node_modules/element-ui/package.json').version}
  */`

const etBuild = (buildFilePath, outputFileName, outputFilePath, cb) => {
  return gulp.src(buildFilePath)
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: pkg.browserslist,
    cascade: false,
  }))
  .pipe($.header(banner))
  .pipe($.rename(outputFileName))
  // .pipe(gulp.dest(outputFilePath))
  .pipe($.cleanCss())
  .pipe($.rename({ suffix: '.min' }))
  .pipe(gulp.dest(outputFilePath))
  .on('end', Object.prototype.toString.call(cb) === '[object Function]' ? cb : () => {});
};

/**
 * 构建Element主题，复制font字体图标
 */
gulp.task('et:copyFonts', () => {
  return gulp.src(['./node_modules/element-ui/lib/theme-chalk/fonts/**'])
    .pipe(gulp.dest('./public/element-theme/fonts'));
});

/**
 * 构建Element主题，根据theme-build.scss文件中$--color-primary变量值构建1套“green绿色[默认]”主题
 */
gulp.task('et', ['et:copyFonts'], () => {
  return etBuild(['./src/theme-build.scss'], 'green.css', './public/element-theme');
});

/**
 * 构建Element主题，根据theme-config.json文件数组值构建多套主题
 */
gulp.task('et:list', ['et:copyFonts'], () => {
  let themeList          = require('./src/theme-config.json').filter(item => !item.hasBuild);
  let themeBuildFile     = './src/theme-build.scss';
  let themeBuildFileTemp = `${themeBuildFile.replace(/\.scss$/, '')}-temp.scss`;

  if (themeList.length <= 0) { return del.sync(themeBuildFileTemp); }

  // 删除临时文件，保证本次操作正常执行
  del.sync(themeBuildFileTemp);

  // 拷贝一份构建.scss样式文件，作为本次构建操作文件
  child_process.spawnSync('cp', ['-r', themeBuildFile, themeBuildFileTemp]);
  
  fnCreate(themeList);

  function fnCreate(themeList) {
    if (themeList.length >= 1) {
      console.log('\n');
      console.log(colors.green(`-------------------- 待构建，${themeList.length}套主题 -------------------------`));
      console.log(JSON.stringify(themeList).replace(/[\[|\]]/g, '').replace(/},/g, '},\n'));

      // 修改.scss临时文件中的$--color-primary主题变量值
      fs.writeFileSync(
        path.resolve(themeBuildFileTemp),
        fs.readFileSync(themeBuildFileTemp, 'utf8').replace(/\$--color-primary:(.*);/, `$--color-primary: ${themeList[0].color};`)
      );

      // 开始构建
      etBuild(themeBuildFileTemp, `${themeList[0].name}.css`, './public/element-theme', () => {
        themeList.splice(0, 1);
        fnCreate(themeList);
      });
    } else {
      // 删除临时文件
      del.sync(themeBuildFileTemp);
      console.log('\n');
      console.log(colors.green('-------------------- 构建完毕，删除临时文件 -------------------------'));
      console.log(themeBuildFileTemp);
    }
  }
});

/**
 * 构建Rubik-admin主题，根据theme文件夹下主题文件构建多套主题
 */
gulp.task('rat', () => {
  return gulp.src(['./src/assets/styles/theme/*.scss'])
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: pkg.browserslist,
      cascade: false
    }))
    .pipe($.header(banner))
    // .pipe(gulp.dest('./public/rubik-admin-theme'))
    .pipe($.cleanCss())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/rubik-admin-theme'));
});

