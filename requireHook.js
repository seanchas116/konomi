var fs = require("fs");
var pegjs = require("pegjs");

require.extensions[".pegjs"] = function (module, filename) {
  var source = fs.readFileSync(filename, "utf8");
  var compiled = pegjs.buildParser(source, {output: "source"});
  return module._compile("module.exports = " + compiled, filename);
}

require("babel/register")();
