[WIP] mosaicpiece
========

Declarative object tree construction system for JavaScript, mainly for UI programming

Influenced by QML, with flavor of Jade and Sass

```js
import * as t from "mosaicpiece/dom";
import {title, largeFont} from "./styles";
console.log("init...");

<Counter>
  t.section
    @id root
    clickCount: 0

    @on "change:clickCount".
      console.log("clickCount changed");

    t.h1 "Super simple counter"
      @include title
      @include largeFont

    t.button
      "Increment"
      @on "click".
        ++root.clicked;

    t.p `${root.clickCount} times clicked`

    @init

export default Counter;
```
