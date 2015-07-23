const INDENT_REGEXP = /\n\s+/gm;

function trimLast(str) {
  return str.replace(/\s+$/, "");
}

function changeIndent(str, diff) {
  return str.replace(INDENT_REGEXP, matched => "\n" + " ".repeat(matched.length + diff));
}

// TODO: source map support

export default
function render(indentLevel) {
  const indent = indentLevel * 2;
  return function (strings, ...values) {

    const indents = strings.map(trimLast).map(s => s.match(INDENT_REGEXP) || []).reduce((a, b) => a.concat(b), []);
    const origIndent = Math.min(...indents, 0);

    const indentedStrings = strings.map(s => changeIndent(s, indent - origIndent));

    let ret = "";

    for (let i = 0; i < strings.length; ++i) {
      ret += indentedStrings[i];
      if (i < values.length) {
        ret += String(values[i]);
      }
    }
    return ret;
  }
}
