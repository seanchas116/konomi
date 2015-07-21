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
        console.log("title init");
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

    @repeat (i of _.times(root.clickCount)) {
      t.p {
        @id countLabel;
        text: `${i}`;
      }
    }

    @on "init" {
      console.log("counter init");
    }
    @prepend "deinit" {
      console.log("counter deinit");
    }
  }
}
```

## Output

```js
const Counter = () => {

  class Counter extends t.section {
    constructor() {
      super();

      let root;
      let title;
      let button;
      let count;

      class Class_title extends mixin(t.h1, title, largeFont) {
        constructor() {
          super();
          title = this;
          this.on("init", () => {
            console.log("title init");
          });
        }
      }

      class Class_button extends t.button {
        constructor() {
          super();

          button = this;
          button.on("clicked", function () {
            ++root.clicked;
          }.bind(button));
        }
      }

      class Class_count extends t.p {
        constructor() {
          super();
          count = this;

          count.bindProperty("content", [root, "clickCount"], function () {
            return `${root.clickCount} times clicked`;
          }.bind(count));
        }
      }
      Class_count.property("content");

      root = this;
      new Class_title();
      new Class_button();
      new Class_count();

      root.on("change:clickCount", function () {
        console.log("clickCount changed");
      }.bind(root));

      root.bindProperty("clickCount", [], function () {
        return 0;
      }.bind(root));

      Component.observeProperty([], function () {
        root.children = [title, button, count];
      });

      root.on("change:children", function () {
        for (const c in root.children) {
          c.parent = this;
        }
      });

      root.on("init", () => {
        console.log("counter init");
      })

      root.prependListener("deinit", () => {
        console.log("counter deinit");
      });
    }
  }
  Counter.property("clickCount");

  return Counter;
}
```
