import render from "./render";

function propertyDepsResolver(expr, {indent}) {
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
    }
  `;
}

function emitProperty(tree, {indent}) {
  const expr = () => {
    switch (tree.expr.type) {
      case "jsExpr":
        return `() => { return ${tree.expr.content} }`;
      case "jsBlock":
        return `() => { ${tree.expr.content} }`;
    }
  }();

  // TODO: resolve dependencies
  return render(indent)`
    this.bindProperty(
      "${tree.name}",
      ${propertyDepsResolver(expr, {indent: indent + 1})}(),
      ${expr}
    );
  `;
}

function emitEventListener(tree, {indent}) {
  const funcNames = {
    "on": "on",
    "prepend": "prependListener",
  };

  return render(indent)`
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

function emitComponent(tree, {ids, className, indent}) {
  const id = getId(tree.members, ids);
  className = className || `Class_${id}`;

  const addProperties =
    tree.members.filter(t => t.type === "property")
      .map(t => render(indent)`
        ${className}.addProperty("${t.name}");
      `)
      .join("");

  return render(indent)`
    class ${className} extends ${tree.name} {
      constructor() {
        super();
        ${emitMembers(tree.members, {ids, indent: indent + 2})}
      }
    }
    ${addProperties}
    ${id} = new ${className}();
  `
}

function emitMembers(members, {ids, indent}) {
  const componentTrees = members.filter(t => t.type === "component");
  const propertyTrees = members.filter(t => t.type === "property");
  const eventListenerTrees = members.filter(t => t.type === "on" || t.type === "prepend");

  const components = componentTrees.map(t => emitComponent(t, {ids, indent})).join("");
  const properties = propertyTrees.map(t => emitProperty(t, {indent})).join("");
  const eventListeners = eventListenerTrees.map(t => emitEventListener(t, {indent})).join("");

  return render(indent)`
    ${components}
    ${eventListeners}
    this.on("link", () => {
      ${properties}
    });
  `;
}

function emitComponentDefinition(tree, {indent}) {
  const ids = [];

  const component = emitComponent(tree.component, {ids, className: tree.name, indent: indent + 1});
  const scope = ids.map(id => render(indent)`
    let ${id};\n
  `).join("");

  return render(indent)`
    const ${tree.name} = () => {
      ${scope}
      ${component}
      return ${tree.name};
    }();
  `;
}

function emitRoot(tree) {
  switch (tree.type) {
    case "jsBlock": {
      return tree.content;
    }
    case "componentDefinition": {
      return emitComponentDefinition(tree, {indent: 0});
    }
  }
}

export default
function emit(trees) {
  return trees.map(emitRoot).join("\n");
}
