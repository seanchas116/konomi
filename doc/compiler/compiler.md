# Compiler

## Input

```js
<Counter> {
  t.section {
    @id root;
    clickCount: 0;

    @on "change:clickCount" {
      console.log("clickCount changed");
    }

    t.h1 {
      text: "Super simple counter";
      @id title;
      @include title;
      @include largeFont;

      @init {
        console.log("header init");
      }
    }

    t.button {
      text: "Increment";
      @on "click" {
        ++root.clicked;
      }
    }

    t.p {
      @id count;
      text: `${root.clickCount} times clicked`;
    }

    @init {
      console.log("counter init");
    }
  }
}
```

## Output

```js
const Counter = () => {
  let __env = {};

  // prepare classes
  class Class_title extends mixin(t.h1, title, largeFont) {
  }

  class Class_button extends t.button {
  }

  class Class_count extends t.p {
  }

  class Counter extends t.section {
    link() {
      const root = this;
      const title = new Class_title();
      const button = new Class_button();
      const count = new Class_count();
      __env = {root, title, button, count};

      // add event listeners
      button.on("clicked", function () {
        ++root.clicked;
      }.bind(button));
      root.on("change:clickCount", function () {
        console.log("clickCount changed");
      }.bind(root));

      // set properties
      count.bindProperty("content", [root, "clickCount"], function () {
        return `${root.clickCount} times clicked`;
      }.bind(count));
      root.clickCount = 0;

      // set children
      root.children = [title, button, count];
    }
    init() {
      super.init();
      console.log("counter init");
    }
    deinit() {
      super.deinit();
    }
  }
  Counter.property("clickCount");

  return Counter;
}
```
