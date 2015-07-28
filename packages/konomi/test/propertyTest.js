import assert from "power-assert";
import Component from "../src/Component";
import * as property from "../src/property";

describe("property", () => {
  describe(".bind", () => {
    let c1, c2;

    beforeEach(() => {
      c1 = new Component();
      property.define(c1, "p1");
      c2 = new Component();
      property.bind(c2, "p2", [[c1, "p1"]], () => c1.p1 * 2);
    });

    it("binds a property", () => {
      c1.p1 = 123;
      assert(c2.p2 === 246);
    });

    it("discard binding on source component disposal", () => {
      c1.dispose();
      assert(c1.changes.listeners("p1").length === 0);
    });

    it("discard binding on dest component disposal", () => {
      c2.dispose();
      assert(c1.changes.listeners("p1").length === 0);
    });
  });
});
