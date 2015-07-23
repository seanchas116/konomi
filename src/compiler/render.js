const INDENT_REGEXP = /\n\s+/gm;

function trimLast(strings) {
  return strings.map((s, i) => {
    if (i == strings.length - 1) {
      return s.replace(/\s+$/, "");
    } else {
      return s;
    }
  });
}

function changeIndent(str, diff) {
  return str.replace(INDENT_REGEXP, matched => "\n" + " ".repeat(matched.length + diff));
}

function indents(strings) {
  return strings.map(s => (s.match(INDENT_REGEXP) || []).length);
}

// TODO: source map support

export default
function render(indentLevel) {
  const indent = indentLevel * 2;
  return function (strings, ...values) {

    const origIndent = Math.min(...indents(trimLast(strings)), 0);
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
