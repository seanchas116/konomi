import fs from "fs";
import * as babel from "babel";
import compile from "./compile";

require.extensions[".konomi"] = (module, filename) => {
  const content = fs.readFileSync(filename, "utf8");
  const compiled = babel.transform(compile(content)).code;
  return module._compile(compiled, filename);
};
