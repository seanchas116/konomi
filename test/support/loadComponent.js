import fs from "fs";
import path from "path";
import * as babel from "babel";
import nodeEval from "eval";
import {parse, SyntaxError} from "../../src/compiler/parser";
import emit from "../../src/compiler/emit";
import lineNumbers from "line-numbers";

export default
function loadComponent(name) {
  const file = fs.readFileSync(path.join(__dirname, `../fixtures/${name}.piece`), {encoding: "utf8"});

  try {
    const parsed = parse(file);
    console.log(JSON.stringify(parsed, null, 2));

    const emitted = emit(parsed);
    console.log(lineNumbers(emitted));

    return nodeEval(babel.transform(emitted));

  } catch (e) {
    if (e instanceof SyntaxError) {
      const {line, column} = e.location.start;
      throw new Error(`Syntax error at ${line}:${column}: ${e.message}`);
    } else {
      throw e;
    }
  }
}
