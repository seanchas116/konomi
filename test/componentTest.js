import Component from "../src/component/Component";
import "../src/compiler/register";
import {assert} from "chai";

describe("TodoList component", () => {
  it("loads", () => {
    const TodoList = require("./fixtures/TodoList");
    assert(TodoList instanceof Component);
  });
});
