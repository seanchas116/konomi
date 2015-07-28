
class Connection {
  constructor(src, srcProp, dest, reassgin) {
    this.src = src;
    this.srcProp = srcProp;
    this.dest = dest;

    this.connection = src.onChange(srcProp, reassgin);
    src.disposables.add(this);
    dest.disposables.add(this);
  }

  dispose() {
    this.src.disposables.delete(this);
    this.dest.disposables.delete(this);
    this.connection.dispose();
  }
}

export
function bind(obj, name, deps, expr) {
  if (!(name in obj)) {
    define(obj, name);
  }

  const update = () => {
    obj[name] = expr();
  }
  for (const [depObj, depName] of deps) {
    new Connection(depObj, depName, obj, update);
  }
  update();
}

export
function define(obj, name) {
  const sName = Symbol(String(name));

  Object.defineProperty(obj, name, {
    enumerable: true,
    get() {
      return this[sName];
    },
    set(value) {
      if (this[sName] !== value) {
        const old = this[sName];
        this[sName] = value;
        this.emitChange(name, value, old);
      }
    }
  });
}
