const sListenersMap = Symbol("listenersMap");
const sInsertOn = Symbol("insertOn");

export default
class EventEmitter {
  constructor() {
    this[sListenersMap] = {};
  }

  on(event, action) {
    return this[sInsertOn](0, event, action);
  }

  prependOn(event, action) {
    return this[sInsertOn](0, event, action);
  }

  listeners(event) {
    return this[sListenersMap][event];
  }

  emit(event, ...args) {
    this[sListenersMap][event].forEach(l => l(...args));
  }

  [sInsertOn](index, event, action) {
    const map = this[sListenersMap];
    const listeners = (map[event] = map[event] || []);
    listeners.splice(index, 0, action);

    const dispose = () => {
      const i = listeners.indexOf(action);
      if (i >= 0) {
        listeners.splice(i, 1);
      }
    };
    return {dispose};
  }
}
