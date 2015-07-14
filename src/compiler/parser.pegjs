{
  const indentStack = [0];
  function lastIndent() {
    return indentStack[indentStack.length - 1];
  }
}

Start
  = Lines

Whitespace
  = [ \t]

Linebreak
  = "\r\n"
  / "\n"
  / "\r"

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
  = chars:(!Linebreak c:. { return  c; })*
{
  return chars.join("");
}

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
  = &(
    whites:Whitespace+
    & {
      return whites.length > lastIndent();
    }
    {
      indentStack.push(whites.length);
    }
  )

IndentUp =
  {
    indentStack.pop();
  }
