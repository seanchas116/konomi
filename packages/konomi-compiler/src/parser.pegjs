{
  const {SourceNode} = require("source-map");

  function sourceNode() {
    const {line, column} = location().start;
    return new SourceNode(line, column, options.filename, text());
  }
}

Start
  = Root

Whitespace
  = [ \t\r\n]

_
  = Whitespace*

__
  = Whitespace+

Identifier
  = chars:[a-zA-Z_]+
  {
    return sourceNode();
  }

// TODO: improve
JSString
  = '"' (!'"' .)* '"'
  {
    return {
      type: "jsExpr",
      content: sourceNode()
    }
  }

JSParensContent
  = (!")" JSText)*
  {
    return sourceNode();
  }

JSParens
  = "(" content:JSParensContent ")"
  {
    return {
      type: "jsExpr",
      content
    };
  }

JSBracesContent
  = (!"}" JSText)*
  {
    return sourceNode();
  }

JSBraces
  = "{" content:JSBracesContent "}"
  {
    return {
      type: "jsBlock",
      content
    };
  }

JSText
  = JSParens / JSBraces / .

JSStatementContent
  = (!";" JSText)*
  {
    return sourceNode();
  }

JSStatement
  = content:JSStatementContent ";"
  {
    return {
      type: "jsExpr",
      content
    };
  }

Method
  = name:Identifier _ signature:JSParens _ body:JSBraces _
  {
    return {
      type: "method",
      name,
      signature,
      body
    };
  }

Property
  = name:Identifier _ ":" _ expr:(JSBraces / JSStatement) _
  {
    return {
      type: "property",
      name,
      expr
    };
  }

ComponentDirective
  = "component" _ name:Identifier _ "{" _ component:Component _ "}" _
  {
    return {
      type: "componentDefinition",
      name,
      component
    };
  }

IdDirective
  = "id" _ name:Identifier _ ";" _
  {
    return {
      type: "id",
      name
    };
  }

IfDirective
  = "if" _ expr:JSParens _ members:Members
  {
    return {
      type: "if",
      expr,
      members
    };
  }

RepeatWithContent
  = (!("of" __) JSText)*
  {
    return sourceNode();
  }

RepeatWith
  = "with" __ content:RepeatWithContent
  {
    return {
      type: "jsExpr",
      content
    };
  }

RepeatOfContent
  = (!")" JSText)*
  {
    return sourceNode();
  }

RepeatOf
  = "of" __ content:RepeatOfContent
  {
    return {
      type: "jsExpr",
      content
    };
  }

RepeatDirective
  = "repeat" _ "(" _ name:Identifier __ key:RepeatWith? iterable:RepeatOf _ ")" _ members:Members
  {
    return {
      type: "repeat",
      name,
      key,
      iterable,
      members
    };
  }

OnDirective
  = "on" __ event:JSString _ block:JSBraces _
  {
    return {
      type: "on",
      event,
      block
    };
  }

PrependDirective
  = "prepend" __ event:JSString _ block:JSBraces _
  {
    return {
      type: "prepend",
      event,
      block
    };
  }

ChildrenDirective
  = "children" _ expr:(JSBraces / JSStatement) _
  {
    return {
      type: "children",
      expr
    };
  }

Directive
  = "@" dir:(IdDirective / IfDirective / RepeatDirective / OnDirective / PrependDirective / ChildrenDirective / ComponentDirective)
  {
    return dir;
  }

Member
  = Directive / Method / Property / Component

Members
  = "{" _ members:Member* "}" _
  {
    return members;
  }

ComponentName
  = Identifier _ ("." _ Identifier _)*
  {
    return sourceNode();
  }

Component
  = name:ComponentName _ members:Members
  {
    return {
      type: "component",
      name,
      members
    }
  }

TopLevelComponent
  = "@" dir:ComponentDirective
  {
    return dir;
  }

TopLevelJS
  = js:JSBraces _
  {
    return js;
  }

Root = (TopLevelJS / TopLevelComponent)*
