import EventEmitter from "./EventEmitter";
import * as property from "./property";

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
    this.changes = new EventEmitter();
    this.disposables = new Set();

    this.onChange("children", function () {
      for (const c in root.children) {
        c.parent = this;
      }
    });
  }

  dispose() {
    const disposables = Array.from(this.disposables);
    for (let i = disposables.length - 1; i >= 0; --i) {
      disposables[i].dispose();
    }
  }

  onChange(propName, action) {
    return this.changes.on(propName, action);
  }

  emitChange(propName, value, old) {
    this.changes.emit(propName, value, old);
  }

  get children() {
    return [];
  }
}

property.define(Component.prototype, "parent");
