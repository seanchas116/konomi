import assert from "power-assert";
import EventEmitter from "../src/EventEmitter";

describe("EventEmitter", () => {

  describe("#on", () => {
    const emitter = new EventEmitter();
    let received;

    const onReceive = (...args) => {
      received = args;
    };
    const doNothing = () => {};

    const subscription = emitter.on("hoge", onReceive);
    emitter.on(doNothing);

    emitter.emit("hoge", 1, 2);

    it("adds listener and return disposable", () => {
      assert.deepEqual(received, [1,2]);
    });

    it("adds listener at the end of listeners", () => {
      assert(emitter.listeners("hoge").indexOf(onReceive) === 0);
    });

    it("return disposable", () => {
      subscription.dispose();
      emitter.emit("hoge", 3, 4);
      assert.deepEqual(received, [1,2]);
    });
  });
});
