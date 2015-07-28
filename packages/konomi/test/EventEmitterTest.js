import assert from "power-assert";
import EventEmitter from "../src/EventEmitter";

describe("EventEmitter", () => {
  describe("#on", () => {
    it("adds an event listener and return disposable", () => {
      const emitter = new EventEmitter();
      let received;
      const subscription = emitter.on("hoge", (...args) => {
        received = args;
      });
      emitter.emit("hoge", 1, 2);
      assert.deepEqual(received, [1,2]);

      subscription.dispose();
      emitter.emit("hoge", 3, 4);
      assert.deepEqual(received, [1,2]);
    });
  });
});
