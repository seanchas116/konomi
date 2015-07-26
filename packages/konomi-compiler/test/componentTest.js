import {Component} from "konomi";
import "../src/register";
import {assert} from "chai";

describe("TodoList component", () => {
  it("loads", () => {
    const TodoList = require("./fixtures/TodoList");
    const todoList = new TodoList();
    assert(todoList instanceof Component);
  });
});
