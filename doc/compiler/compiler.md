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

      // define children classes

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

          this.on("clicked", () => {
            ++root.clicked;
          });
        }
      }

      class Class_count extends t.p {
        constructor() {
          super();
          count = this;

          this.bindProperty("content", [root, "clickCount"], () => {
            return `${root.clickCount} times clicked`;
          });
        }
      }
      Class_count.property("content");

      // create children //

      root = this;
      new Class_title();
      new Class_button();
      new Class_count();

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
  Counter.property("clickCount");

  return Counter;
}
```
