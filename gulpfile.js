const { dest, parallel, src, task, watch } = require("gulp");
const livereload = require("gulp-livereload");
const prettier = require("gulp-prettier");
const { argv } = require("yargs");

const SRC_DIR = "src";
const DIST_DIR = "dist";

const moveToDist = (path) => {
  return dest(`${DIST_DIR}/${path ? path : ''}`);
};

const handleHTML = () => {
  return src(`${SRC_DIR}/*.html`)
    .pipe(prettier())
    .pipe(argv.prod ? moveToDist() : livereload());
};

const handleCSS = () => {
  return src(`${SRC_DIR}/css/*.css`)
    .pipe(argv.prod ? moveToDist('css') : livereload());
};

const handleJS = () => {
  return src(`${SRC_DIR}/js/*.js`)
    .pipe(prettier())
    .pipe(argv.prod ? moveToDist('js') : livereload());
};

if (!argv.prod) {
  livereload.listen();
  watch(`${SRC_DIR}/*.html`, handleHTML);
  watch(`${SRC_DIR}/css/*.css`, handleCSS);
  watch(`${SRC_DIR}/js/*.js`, handleJS);
}

task("default", parallel(handleHTML, handleCSS, handleJS));
