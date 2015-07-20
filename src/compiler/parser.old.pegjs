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
      type: "blockText",
      content: lastIndent() + content.content + children.map(c => c.content).join("")
    };
  }

RawLines
  = (BlankLine / RawLine)*

RawChildren
  = children:(BlankLine* IndentDown children:RawLines IndentUp { return children; })?
  {
    return children || [];
  }

RawBlock
  = Linebreak content:RawChildren
  {
    return {
      type: "blockText",
      content
    };
  }

RawText
  = chars:NonLinebreak*
  {
    return {
      type: "text",
      content: chars.join("")
    };
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

MethodDirective
  = "method" _ sig:RawText body:RawBlock
  {
    return {
      type: "method",
      sig,
      body
    };
  }

OnDirective
  = "on" _ name:RawText expr:RawBlock
  {
    return {
      type: "on",
      name,
      expr
    };
  }

InitDirective
  = "init" _ expr:RawBlock
  {
    return {
      type: "init",
      expr
    };
  }

DeinitDirective
  = "deinit" _ expr:RawBlock
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
  / MethodDirective
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
      content: ws.join("")
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
