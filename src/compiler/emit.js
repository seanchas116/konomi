import render from "./render";

function emitPropertyDeps(expr, {indent}) {
  // e.g. foo.bar
  const exprWithCheck = expr.replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\.\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*(?=[^(])/, (match, obj, prop) => {
    return `__checkDep(${obj}, "${prop}")`;
  });

  return render(indent)`
    () => {
      const __deps = [];
      const __checkDep = (obj, name) => {
        console.log("Checking deps for", name);
        if (obj != null && obj.isKonomiComponent) {
          __deps.push([obj, name]);
        }
        return obj[name];
      };
      ${exprWithCheck}();
      return __deps;
    }()
  `;
}

function emitProperty(property, {indent}) {
  const {name, block} = property;

  const func = `() => { ${block} }`;

  // TODO: resolve dependencies
  return render(indent)`
    this.bindProperty(
      "${name}",
      ${emitPropertyDeps(func, {indent: indent + 1})},
      ${func}
    );
  `;
}

function emitEventListener(listener, {indent}) {
  const {type, event, block} = listener;
  const funcNames = {
    "on": "on",
    "prepend": "prependListener",
  };

  return render(indent)`
    this.${funcNames[type]}(${event}, () => {
      ${block}
    });
  `;
}

function emitComponent(component, {indent}) {
  const {id, className, superName, members} = component;

  const addProperties = members.properties
    .map(t => render(indent)`
      ${className}.addProperty("${t.name}");
    `)
    .join("");

  return render(indent)`
    class ${className} extends ${superName} {
      constructor() {
        super();
        ${emitMembers(members, {indent: indent + 2})}
      }
    }
    ${addProperties}
    ${id} = new ${className}();
  `
}

function emitMembers(members, {indent}) {
  const {components, properties, eventListeners} = members;

  const componentsOutput = components.map(t => emitComponent(t, {indent})).join("");
  const propertiesOutput = properties.map(t => emitProperty(t, {indent: indent + 1})).join("");
  const eventListenersOutput = eventListeners.map(t => emitEventListener(t, {indent})).join("");

  return render(indent)`
    ${componentsOutput}
    ${eventListenersOutput}
    this.on("link", () => {
      ${propertiesOutput}
    });
  `;
}

function emitComponentDefinition(componentDefinition, {indent}) {
  const {scope, component} = componentDefinition;
  const {className} = component;

  const componentOutput = emitComponent(component, {indent: indent + 1});
  const scopeOutput = scope.map(id => render(indent)`
    let ${id};\n
  `).join("");

  return render(indent)`
    const ${className} = () => {
      ${scopeOutput}
      ${componentOutput}
      return ${className};
    }();
  `;
}

function emitRoot(item) {
  switch (item.type) {
    case "js": {
      return item.content;
    }
    case "componentDefinition": {
      return emitComponentDefinition(item, {indent: 0});
    }
  }
}

export default
function emit(items) {
  return items.map(emitRoot).join("\n");
}
