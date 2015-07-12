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
    this[sConnections] = new Set();
    this.emit("init");
  }

  dispose() {
    this.emit("deinit");
    for (const c of Array.from(this[sConnections])) {
      c.dispose();
    }
  }

  on(...args) {
    if (args.length === 2) {
      return super.on(...args);
    }
    new Connection(this, ...args);
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
  }
}
