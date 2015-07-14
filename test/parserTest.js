const fs = require("fs");
const path = require("path");
const {assert} = require("chai");
const parser = require("../src/compiler/parser");

const testFile = fs.readFileSync(path.join(__dirname, "fixtures/Test.piece"), {encoding: "utf8"});

describe("parse", () => {
  it("parses", () => {
    const parsed = parser.parse(testFile);
    console.log(JSON.stringify(parsed, null, 2));
    assert(typeof parsed === "object");
  });
});
