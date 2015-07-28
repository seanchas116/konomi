import assert from "power-assert";
import EventEmitter from "../src/EventEmitter";

describe("EventEmitter", () => {

  let emitter, received, onReceive, doNothing;

  beforeEach(() => {
    emitter = new EventEmitter();
    received = false;
    onReceive = (...args) => {
      received = args;
    };
    doNothing = () => {};
  });

  describe("#on", () => {
    let subscription;

    beforeEach(() => {
      subscription = emitter.on("hoge", onReceive);
      emitter.on("hoge", doNothing);

      emitter.emit("hoge", 1, 2);
    });

    it("adds listener", () => {
      assert.deepEqual(received, [1,2]);
    });

    it("adds listener at the end of listeners", () => {
      assert.deepEqual(emitter.listeners("hoge"), [onReceive, doNothing]);
    });

    it("returns disposable", () => {
      subscription.dispose();
      emitter.emit("hoge", 3, 4);
      assert.deepEqual(received, [1,2]);
    });
  });

  describe("#prependOn", () => {
    let subscription;

    beforeEach(() => {
      subscription = emitter.prependOn("hoge", onReceive);
      emitter.prependOn("hoge", doNothing);

      emitter.emit("hoge", 1, 2);
    });

    it("adds listener", () => {
      assert.deepEqual(received, [1,2]);
    });

    it("adds listener at the end of listeners", () => {
      assert.deepEqual(emitter.listeners("hoge"), [doNothing, onReceive]);
    });

    it("returns disposable", () => {
      subscription.dispose();
      emitter.emit("hoge", 3, 4);
      assert.deepEqual(received, [1,2]);
    });
  });
});
