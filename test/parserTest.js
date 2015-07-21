const fs = require("fs");
const path = require("path");
const {assert} = require("chai");
const parser = require("../src/compiler/parser");
const emit = require("../src/compiler/emit");

const testFile = fs.readFileSync(path.join(__dirname, "fixtures/TodoList.piece"), {encoding: "utf8"});

describe("parse", () => {
  it("parses", () => {
    try {
      const parsed = parser.parse(testFile);
      console.log(JSON.stringify(parsed, null, 2));
      console.log(emit(parsed));
      assert(typeof parsed === "object");
    } catch (e) {
      if (e instanceof parser.SyntaxError) {
        const {line, column} = e.location.start;
        throw new Error(`Syntax error at ${line}:${column}: ${e.message}`);
      } else {
        throw e;
      }
    }
  });
});
