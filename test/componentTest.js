import Component from "../src/component/Component";
import loadComponent from "./support/loadComponent";
import {assert} from "chai";

describe("TodoList component", () => {
  it("loads", () => {
    const TodoList = loadComponent("TodoList");
    assert(TodoList instanceof Component);
  });
});
