var gulp = require("gulp");
var shell = require("gulp-shell");

var PEGJS_SRC = "./src/compiler/parser.pegjs"

gulp.task("pegjs", shell.task([
  `pegjs --trace ${PEGJS_SRC}`
]));

gulp.task("watch", ["pegjs"], function () {
  gulp.watch(PEGJS_SRC, ["pegjs"]);
});

gulp.task("default", ["watch"]);
