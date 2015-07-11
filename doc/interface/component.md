# Component interface

```js
interface Component : EventEmitter, Disposable {
  event ["change:<property name>"](newValue);
}
```

### `change:<propety name>` event

Emitted just after the property is **actually** changed.

## Example

```js
import {EventEmitter} from "events";

class Button extends EventEmitter { // implements Component
  get name() {
    return this._name;
  }
  set name(name) {
    if (this._name !== name) {
      this._name = name;
      this.emit("change:name", name);
    }
  }

  constructor() {
    this.name = "Click me";
  }

  dispose() {
    console.log("disposing button...");
  }
}
```
