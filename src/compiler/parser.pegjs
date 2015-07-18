{
  const indentStack = [0];
  function lastIndent() {
    return indentStack[indentStack.length - 1];
  }
}

Start
  = (BlankLine / DefinitionLine / RawLine)*

Whitespace
  = [ \t]

Linebreak
  = "\r\n"
  / "\n"
  / "\r"

NonLinebreak
  = !Linebreak c:.
  {
    return c;
  }

_
  = ws:Whitespace*

Identifier
  = chars:[a-zA-Z_]+ _
  {
    return chars.join("");
  }

Lines
  = (BlankLine / PropertyLine / IdLine / RepeatLine / ElementLine)*

Children
  = BlankLine* IndentDown children:Lines IndentUp
  {
    return children;
  }

DefinitionName
  = "<" _ name:Identifier ">" _
{
  console.log("definition name");
  return name;
}

DefinitionLine
  = IndentKeep name:DefinitionName Linebreak children:Children?
  {
    return {
      type: "definition",
      name: name,
      children: children
    }
  }

RawLine
  = IndentKeep content:RawText Linebreak children:RawChildren?
  {
    return {
      type: "raw",
      content: content,
      indent: lastIndent(),
      children: children || []
    };
  }

RawLines
  = lines:(BlankLine / RawLine)*
  {
    return lines;
  }

RawChildren
  = BlankLine* IndentDown children:RawLines IndentUp
  {
    return children;
  }

RawBlock
  = "." _ Linebreak children:RawChildren
  {
    return children;
  }

RawText
  = chars:NonLinebreak*
  {
    return chars.join("");
  }

ElementExpr
  = !"@" chars:NonLinebreak*
  {
    return chars.join("");
  }

PropertyLine
  = IndentKeep name:Identifier ":" _ expr:(RawBlock / RawText)
  {
    return {
      type: "property",
      expr: expr
    };
  }

IdLine
  = IndentKeep "@id" _ name:Identifier Linebreak
  {
    return {
      type: "id",
      name: name
    };
  }

RepeatLine
  = IndentKeep "@repeat" _ name:Identifier key:("with" _ key:Identifier { return key; })? "of" _ expr:RawText Linebreak children: Children?
  {
    return {
      type: "repeat",
      key,
      name,
      expr,
      children: children || []
    };
  }

ElementLine
  = IndentKeep expr:ElementExpr Linebreak children: Children?
  {
    return {
      type: "element",
      expr: expr,
      children: children || []
    };
  }

BlankLine
  = ws:_ Linebreak
  {
    return {
      type: "blank",
      raw: ws.join("")
    };
  }

IndentKeep
  = whites:_
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
