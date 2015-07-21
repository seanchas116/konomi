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

      // define scope

      let root;
      let title;
      let button;
      let count;

      root = this;

      // create objects

      title = new (mixin(t.h1, title, largeFont))();
      (function () {
        Component.addProperty(this, "text");
        this.on("init", () => {
          console.log("title init");
        });
      }).call(title);

      button = new t.button();
      (function () {
        Component.addProperty(this, "text");
        this.on("clicked", () => {
          ++root.clicked;
        });
      }).call(button);

      count = new t.p();
      (function () {
        Component.addProperty(this, "text");
        this.bindProperty("content", [root, "clickCount"], () => {
          return `${root.clickCount} times clicked`;
        });
      }).call(count);

      // bind properties //

      this.bindProperty("clickCount", [], () => {
        return 0;
      });

      // bind events //

      this.on("change:clickCount", () => {
        console.log("clickCount changed");
      });

      this.on("init", () => {
        console.log("counter init");
      })

      this.prependListener("deinit", () => {
        console.log("counter deinit");
      });

      Component.observeProperty([], () => {
        root.children = [title, button, count];
      });
    }
  }
  Component.addProperty(Counter.prototype, "clickCount");

  return Counter;
}
```
