
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
    return text();
  }

// TODO: improve
JSString
  = '"' (!'"' .)* '"'
  {
    return {
      type: "jsExpr",
      content: text()
    }
  }

JSParensContent
  = (!")" JSText)*
  {
    return text();
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
    return text();
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
    return text();
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
    return text();
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
    return text();
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

Directive
  = "@" dir:(IdDirective / IfDirective / RepeatDirective / OnDirective / PrependDirective)
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
    return text();
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

ComponentDefinition
  = "<" _ name:Identifier _ ">" _ "{" _ component:Component _ "}" _
  {
    return {
      type: "componentDefinition",
      name,
      component
    };
  }

TopLevelJS
  = js:JSBraces _
  {
    return js;
  }

Root = (TopLevelJS / ComponentDefinition)*
