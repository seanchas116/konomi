var fs = require("fs");
var pegjs = require("pegjs");
var babel = require("babel");

require.extensions[".pegjs"] = function (module, filename) {
  var source = fs.readFileSync(filename, "utf8");
  var compiled = pegjs.buildParser(source, {output: "source"});
  var babelified = babel.transform("module.exports = " + compiled).code;
  return module._compile(babelified, filename);
}

require("babel/register")();
