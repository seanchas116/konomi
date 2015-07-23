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

  const sChildren = Symbol("children");

  class Counter extends t.section {
    constructor() {
      super();

      let root;
      let title;
      let button;
      let count;

      root = this;

      // create objects

      class Class_title extends mixin(t.h1, title, largeFont) {
        constructor() {
          this.on("init", () => {
            console.log("title init");
          });
        }
      }
      Class_title.addProperty("text");
      title = new Class_title();

      class Class_button extends t.button {
        constructor() {
          this.on("clicked", () => {
            ++root.clicked;
          });
        }
      }
      Class_button.addProperty(this, "text");

      button = new Class_button();

      class Class_count extends t.button {
        constructor() {
          this.bindProperty("content", [root, "clickCount"], () => {
            return `${root.clickCount} times clicked`;
          });
        }
      }
      Class_count.addProperty("text");

      count = new Class_count();

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
        root[sChildren] = [title, button, count];
        this.emit("change:children", this.children);
      });
    }

    get children() {
      return super.children.concat(this[sChildren]);
    }
  }
  Counter.addProperty("clickCount");

  return Counter;
}
```
