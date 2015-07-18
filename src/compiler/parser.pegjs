{
  const indentStack = [""];
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

DefinitionName
  = "<" _ name:Identifier ">" _
{
  return name;
}

DefinitionLine
  = IndentKeep name:DefinitionName Linebreak children:Children
  {
    return {
      type: "definition",
      name,
      children
    }
  }

RawLine
  = IndentKeep content:RawText Linebreak children:RawChildren
  {
    return {
      type: "raw",
      indent: lastIndent(),
      content,
      children
    };
  }

RawLines
  = lines:(BlankLine / RawLine)*
  {
    return lines;
  }

RawChildren
  = children:(BlankLine* IndentDown children:RawLines IndentUp { return children; })?
  {
    return children || [];
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

TrailingRaw
  = RawBlock / RawText

ElementExpr
  = !"@" chars:NonLinebreak*
  {
    return chars.join("");
  }

IdDirective
  = "id" _ name:Identifier Linebreak
  {
    return {
      type: "id",
      name: name
    };
  }

RepeatDirective
  = "repeat" _ name:Identifier key:("with" _ key:Identifier { return key; })? "of" _ expr:RawText Linebreak children: Children
  {
    return {
      type: "repeat",
      key,
      name,
      expr,
      children
    };
  }

IfDirective
  = "if" _ expr:RawText Linebreak children: Children
  {
    return {
      type: "if",
      expr,
      children
    };
  }

MethodsDirective
  = "methods" _ expr:RawBlock
  {
    return {
      type: "methods",
      expr
    };
  }

OnDirective
  = "on" _ name:Identifier expr:TrailingRaw
  {
    return {
      type: "on",
      name,
      expr
    };
  }

InitDirective
  = "init" _ expr:TrailingRaw
  {
    return {
      type: "init",
      expr
    };
  }

DeinitDirective
  = "deinit" _ expr:TrailingRaw
  {
    return {
      type: "deinit",
      expr
    };
  }

PropertyLine
  = IndentKeep name:Identifier ":" _ expr:TrailingRaw
  {
    return {
      type: "property",
      expr
    };
  }

Directive
  = IdDirective
  / RepeatDirective
  / IfDirective
  / MethodsDirective
  / OnDirective
  / InitDirective
  / DeinitDirective

DirectiveLine
  = IndentKeep "@" directive:Directive
  {
    return directive;
  }

ElementLine
  = IndentKeep expr:ElementExpr Linebreak children: Children
  {
    return {
      type: "element",
      expr,
      children
    };
  }

Lines
  = (BlankLine / PropertyLine / DirectiveLine / ElementLine)*

Children
  = children:(BlankLine* IndentDown children:Lines IndentUp { return children; })?
  {
    return children || [];
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
    return whites.join("").length === lastIndent().length;
  }

IndentDown
  = &(
    whites:Whitespace+
    & {
      return whites.join("").length > lastIndent().length;
    }
    {
      indentStack.push(whites.join(""));
    }
  )

IndentUp =
  {
    indentStack.pop();
  }
