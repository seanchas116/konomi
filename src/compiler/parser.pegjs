{
  const indentStack = [0];
  function lastIndent() {
    return indentStack[indentStack.length - 1];
  }
}

Whitespace
  = [ \t]

Linebreak
  = "\r\n"
  / "\n"
  / "\r"

Start
  = Lines

Lines
  = lines:(BlankLine / Line)*
  {
    return lines.filter(c => c != null);
  }

Children
  = BlankLine* IndentDown children:Lines IndentUp
  {
    return children;
  }

// TODO
LineContent
  = [a-zA-Z0-9]*

Line
  = IndentKeep content:LineContent Linebreak children:Children?
  {
    return {
      type: "line",
      content: content,
      children: children || []
    };
  }

BlankLine
  = Whitespace* Linebreak
  {
    return null;
  }

IndentKeep
  = whites:Whitespace*
  & {
    return whites.length === lastIndent();
  }

IndentDown
  = whites:Whitespace+
  & {
    return whites.length > lastIndent();
  }
  {
    context.indentStack.push(whites.length);
  }

IndentUp =
  {
    indentStack.pop();
  }
