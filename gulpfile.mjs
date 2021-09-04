import gulp from 'gulp';
import shell from 'gulp-shell';
import replace from 'gulp-replace';

const build = () => gulp.src('package.json').pipe(shell('npm run build'));
const copy = () => gulp.src('README.md').pipe(gulp.dest('dist'));
const update = () =>
  gulp
    .src('package.json')
    .pipe(replace('"private": true,', '"private": false,'))
    .pipe(gulp.dest('dist'));
const publish = () =>
  gulp.src('package.json').pipe(shell('cd dist && npm publish'));

export default gulp.series(build, copy, update, publish);
