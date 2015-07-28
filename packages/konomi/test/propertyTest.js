import assert from "power-assert";
import Component from "../src/Component";
import * as property from "../src/property";

describe("property", () => {
  describe(".bind", () => {
    it("binds a property", () => {
      const c1 = new Component();
      property.define(c1, "p1");
      const c2 = new Component();
      property.bind(c2, "p2", [[c1, "p1"]], () => c1.p1 * 2);

      c1.p1 = 123;
      assert(c2.p2 === 246);
    });
  });
});
