[WIP] konomi
========

Declarative object tree construction system for JavaScript, mainly for UI programming

Influenced by QML, with flavor of Jade and Sass

```js
// FIXME: outdated
import Element from "ui-element";
import {title, largeFont} from "./styles";

<Counter>
  Element
    @id root
    clickCount: 0

    @on "change:clickCount"
      console.log("clickCount changed");

    Element
      @include title
      @include largeFont
      text: "Super simple counter"

    Element
      text: "Increment"
      @on "click"
        ++root.clicked;

    Element
      text: `${root.clickCount} times clicked`

    @init
      console.log("initializing counter...");

export default Counter;
```
