import {EventEmitter} from "events";

export default
class ObservableArray extends EventEmitter {
  constructor(xs) {
    this.xs = Array.from(xs);
  }

  get length() {
    return this.xs.length;
  }

  [Symbol.iterator]() {
    return this.xs[Symbol.iterator]();
  }

  get(i) {
    return this.xs[i];
  }
  set(i, x) {
    this.xs[i] = x;
    return this;
  }
  push(...xs) {
    this.splice(this.length, 0, ...xs);
    return this.length;
  }
  unshift(...xs) {
    this.splice(0, 0, ...xs);
    return this.length;
  }
  pop() {
    return this.splice(this.length - 1, 1)[0];
  }
  shift() {
    return this.splice(0, 1)[0];
  }
  splice(index, howMany, ...elements) {
    // remove
    const removed = this.xs.splice(index, howMany);
    this.emit("remove", removed);

    // insert
    this.xs.splice(index, 0, ...elements);
    this.emit("insert", elements);

    return removed;
  }
}
