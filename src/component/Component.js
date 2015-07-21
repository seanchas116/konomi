import {EventEmitter} from "events";

const sConnections = Symbol("connections");

class Connection {
  constructor(...args) {
    [this.sender, this.eventName, this.receiver, this.action] = args;

    this.sender.on(this.eventName, this.action);

    this.sender[sConnections].add(this);
    this.receiver[sConnections].add(this);
  }

  dispose() {
    this.sender[sConnections].delete(this);
    this.receiver[sConnections].delete(this);

    this.sender.removeListener(this.eventName, this.action);
  }
}

export default
class Component extends EventEmitter {

  constructor() {
    super();
    this[sConnections] = new Set();

    this.on("change:children", function () {
      for (const c in root.children) {
        c.parent = this;
      }
    });
  }

  dispose() {
    for (const c of Array.from(this[sConnections])) {
      c.dispose();
    }
  }

  connect(eventName, receiver, action) {
    new Connection(this, eventName, receiver, action);
  }

  prependListener(event, listener) {
    const oldListeners = this.listeners(event) || [];
    this.removeAllListeners(event);
    const ret = this.on(event, listener);
    for (const l of oldListeners) {
      this.on(event, l);
    }
    return ret;
  }

  static property(name) {
    const sName = Symbol(name);
    const eventName = `change:${name}`;

    this.prototype.defineProperty(name, {
      enumerable: true,
      get() {
        return this[sName];
      },
      set(value) {
        if (this[sName] !== value) {
          this[privateName] = value;
          this.emit(eventName, value);
        }
      }
    });
    return this;
  }
}

Component.property("children");
Component.property("parent");
