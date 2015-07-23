// TODO: source map support

function propertyDepsResolver(expr) {
  // e.g. foo.bar
  const exprWithCheck = expr.replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\.\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*(?=[^(])/, (match, obj, prop) => {
    return `__checkDep(${obj}, "${prop}")`;
  });

  return `
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
    }
  `;
}

function emitProperty(tree) {
  const expr = () => {
    switch (tree.expr.type) {
      case "jsExpr":
        return `() => { return ${tree.expr.content} }`;
      case "jsBlock":
        return `() => { ${tree.expr.content} }`;
    }
  }();

  // TODO: resolve dependencies
  return `
    this.bindProperty(
      "${tree.name}",
      ${propertyDepsResolver(expr)}(),
      ${expr}
    );
  `;
}

function emitEventListener(tree) {
  const funcNames = {
    "on": "on",
    "prepend": "prependListener",
  };

  return `
    this.${funcNames[tree.type]}(${tree.event.content}, () => {
      ${tree.block.content}
    });
  `;
}

function getId(members, ids) {
  const idTree = members.find(t => t.type === "id");
  if (idTree) {
    if (ids.indexOf(idTree.name) >= 0) {
      throw new Error(`ID "${idTree.name}" already used`);
    }
  }
  const id = idTree ? idTree.name : `__component_${ids.length}`;
  ids.push(id);
  return id;
}

function emitComponent(tree, {ids, className}) {
  const id = getId(tree.members, ids);
  className = className || `Class_${id}`;

  const addProperties =
    tree.members.filter(t => t.type === "property")
      .map(t => `${className}.addProperty("${t.name}");\n`)
      .join("");

  return `
    class ${className} extends ${tree.name} {
      constructor() {
        super();
        ${emitMembers(tree.members, {ids})}
      }
    }
    ${addProperties}
    ${id} = new ${className}();
  `
}

function emitMembers(members, {ids}) {
  const componentTrees = members.filter(t => t.type === "component");
  const propertyTrees = members.filter(t => t.type === "property");
  const eventListenerTrees = members.filter(t => t.type === "on" || t.type === "prepend");

  return componentTrees.map(t => emitComponent(t, {ids})).join("") +
    propertyTrees.map(emitProperty).join("") +
    eventListenerTrees.map(emitEventListener).join("");
}

function emitComponentDefinition(tree) {
  const ids = [];

  const component = emitComponent(tree.component, {ids, className: tree.name});
  const scope = ids.map(id => `let ${id};\n`).join("");

  return `
    const ${tree.name} = () => {
      ${scope}
      ${component}
      return ${tree.name}
    }();
  `;
}

function emitRoot(tree) {
  switch (tree.type) {
    case "jsBlock": {
      return tree.content;
    }
    case "componentDefinition": {
      return emitComponentDefinition(tree);
    }
  }
}

export default
function emit(trees) {
  return trees.map(emitRoot).join("\n");
}
