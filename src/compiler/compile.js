import {parse} from "./parser";
import emit from "./emit";
import lineNumbers from "line-numbers";

export default
function compile(content) {
  try {
    const parsed = parse(content);
    console.log(JSON.stringify(parsed, null, 2));

    const emitted = emit(parsed);
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
