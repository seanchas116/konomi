var gulp = require("gulp");
var shell = require("gulp-shell");

var PEGJS_SRC = "./src/compiler/parser.pegjs"

gulp.task("pegjs", shell.task([
  `pegjs ${PEGJS_SRC}`
]));
