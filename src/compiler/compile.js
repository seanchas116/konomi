import {parse} from "./parser";
import emit from "./emit";
import build from "./build";
import lineNumbers from "line-numbers";

export default
function compile(content, {filename}) {
  try {
    const parsed = parse(content, {filename});
    console.log(JSON.stringify(parsed, null, 2));

    const tree = build(parsed);
    console.log(JSON.stringify(tree, null, 2));

    const emitted = emit(tree).toString();
    console.log(lineNumbers(emitted));

    return emitted;
  }
  catch (e) {
    if (e instanceof SyntaxError) {
      const {line, column} = e.location.start;
      throw new Error(`Syntax error at ${line}:${column}: ${e.message}`);
    } else {
      throw e;
    }
  }
}
