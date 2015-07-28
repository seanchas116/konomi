const sListenersMap = Symbol("listenersMap");
const sInsertOn = Symbol("insertOn");

export default
class EventEmitter {
  constructor() {
    this[sListenersMap] = {};
  }

  on(event, action) {
    const map = this[sListenersMap];
    const listeners = (map[event] = map[event] || []);
    listeners.push(action);

    const dispose = () => {
      const i = listeners.indexOf(action);
      if (i >= 0) {
        listeners.splice(i, 1);
      }
    };
    return {dispose};
  }

  prependOn(event, action) {
    const map = this[sListenersMap];
    const listeners = (map[event] = map[event] || []);
    listeners.unshift(action);

    const dispose = () => {
      const i = listeners.indexOf(action);
      if (i >= 0) {
        listeners.splice(i, 1);
      }
    };
    return {dispose};
  }

  listeners(event) {
    return this[sListenersMap][event] || [];
  }

  emit(event, ...args) {
    this.listeners(event).forEach(l => l(...args));
  }
}
