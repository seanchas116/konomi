import {concatSourceNodes} from "./util";

const INDENT_REGEXP = /(?:\n)[ \t]+/g;

function trimLast(strings) {
  return strings.map((s, i) => {
    if (i === strings.length - 1) {
      return s.trim();
    }
    return s;
  });
}

function changeIndent(str, diff) {
  return str.replace(INDENT_REGEXP, matched => "\n" + " ".repeat(matched.length + diff));
}

function getIndents(strings) {
  return strings
    .map(s => s.match(INDENT_REGEXP) || [])
    .reduce((a, b) => a.concat(b), [])
    .map(s => s.length);
}

function fixIndents(strings, indent) {
  const indents = getIndents(strings);
  const origIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return strings.map(s => changeIndent(s, indent - origIndent));
}

export default
function render(indentLevel) {
  const indent = indentLevel * 2;
  return function (strings, ...values) {
    const indentedStrings = fixIndents(trimLast(strings), indent);

    const children = [];

    for (let i = 0; i < strings.length; ++i) {
      children.push(indentedStrings[i]);
      if (i < values.length) {
        children.push(values[i]);
      }
    }
    return concatSourceNodes(children);
  }
}
