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

    @init {
      console.log("counter init");
    }
    @deinit {
      console.log("counter deinit");
    }
  }
}
```

## Output

```js
const Counter = () => {
  let root;
  let title;
  let button;
  let count;

  class Counter extends t.section {
    link() {
      super.link();

      class Class_title extends mixin(t.h1, title, largeFont) {
        link() {
          title = this;
        }

        init() {
          super.init();
          console.log("title init");
        }
      }

      class Class_button extends t.button {
        link() {
          button = this;

          button.on("clicked", function () {
            ++root.clicked;
          }.bind(button));
        }
      }

      class Class_count extends t.p {
        link() {
          count = this;

          count.bindProperty("content", [root, "clickCount"], function () {
            return `${root.clickCount} times clicked`;
          }.bind(count));
        }
      }

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
    }
    init() {
      super.init();
      console.log("counter init");
    }
    deinit() {
      console.log("counter deinit");
      super.deinit();
    }
  }
  Counter.property("clickCount");

  return Counter;
}
```
