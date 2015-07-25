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
        @id repeatedLabel;
        text: `${i}`;
      }
    }
    @if (0 < root.clickCount) {
      t.p {
        id: clickedLabel;
        text: "clicked!";
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

  // prepare symbols //
  const konomi$$scope = Symbol("scope");

  // define classes

  class Class_title extends mixin(t.h1, title, largeFont) {
    constructor() {
      this.on("init", () => {
        console.log("title init");
      });
    }
  }
  Class_title.addProperty("text");

  class Class_button extends t.button {
    constructor() {
      this.on("clicked", () => {
        ++root.clicked;
      });
    }
  }
  Class_button.addProperty(this, "text");

  class Class_count extends t.button {
    constructor() {

    }
  }
  Class_count.addProperty("text");

  class Counter extends t.section {
    constructor() {
      super();

      {
        const scope = {};

        // create children & set scope
        scope.root = this;
        scope.title = new Class_title();
        scope.button = new Class_button();
        scope.count = new Class_count();

        scope.root[konomi$$scope] = scope;
        scope.title[konomi$$scope] = scope;
        scope.button[konomi$$scope] = scope;
        scope.count[konomi$$scope] = scope;
      }

      {
        const {root, title, button, count} = this[konomi$$scope];

        // bind properties //

        root.bindProperty("clickCount", [], function () {
          return 0;
        }.bind(root));

        count.bindProperty("content", [root, "clickCount"], function () {
          return `${root.clickCount} times clicked`;
        }.bind(count));

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

        // repeat object //

        const konomi$$repeater_0 = new ComponentRepeater();
        {
          konomi$$repeater_0.template = (repeatObj) => {
            return new Class_repeatedLabel(repeatObj)
          };
          konomi$$repeater_0.bindProperty("items", [root, "clickCount"], () => {
            return _.times(root.clickCount);
          });

          class Class_repeatedLabel extends t.p {
            constructor(konomi$$repeatObject) {
              super();

              this[konomi$$scope] = Object.assign({}, root[konomi$$scope]);

              {
                const scope = {};

                // create children & set scope
                scope.repeatedLabel = this;

                scope.repeatedLabel[konomi$$scope] = scope;
              }

              {
                // bind properties //

                count.bindProperty("content", [konomi$$repeatObject, "item"], function () {
                  return `${i}`;
                }.bind(count));
              }
            }
          }
        }

        // set children //

        root.bindProperty(konomi$$ownChildren, [[root, "clickCount"], [konomi$$repeater_0, "children"]], () => {
          return [title, button, ...konomi$$repeater_0.children, count]
        });
      }
    }

    get children() {
      const {root, title, button, count} = this[konomi$$scope];

      return super.children.concat([title, button, count]);
    }
  }
  Counter.addProperty("clickCount");

  return Counter;
}
```
