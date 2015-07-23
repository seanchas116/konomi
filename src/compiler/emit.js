// TODO: source map support

function emitProperty(tree) {
  const block = () => {
    switch (tree.expr.type) {
      case "jsExpr":
        return `return ${tree.expr.content}`;
      case "jsBlock":
        return tree.expr.content;
    }
  }();

  // TODO: resolve dependencies
  return `
    this.bindProperty("${tree.name}", [], function () {
      ${block}
    }.bind(this));
  `;
}

function emitEventListener(tree) {
  const funcNames = {
    "on": "on",
    "append": "appendListener",
  };

  return `
    this.${funcNames[tree.type]}(${tree.event.content}, function () {
      ${tree.block.content}
    }.bind(this));
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

function emitComponent(tree, ids) {
  const id = getId(tree.members, ids);

  return `
    class Class_${id} extends ${tree.name} {
      constructor() {
        ${emitMembers(tree.members, ids)}
      }
    }
    ${id} = new Class_${id}();
  `
}

function emitMembers(members, ids) {
  const componentTrees = members.filter(t => t.type === "component");
  const propertyTrees = members.filter(t => t.type === "property");
  const eventListenerTrees = members.filter(t => t.type === "on" || t.type === "prepend");

  return componentTrees.map(t => emitComponent(t, ids)).join("") +
    propertyTrees.map(emitProperty).join("") +
    eventListenerTrees.map(emitEventListener).join("");
}

function emitComponentDefinition(tree) {
  const ids = [];

  const id = getId(tree.component.members, ids);

  const members = emitMembers(tree.component.members, ids);
  const name = tree.name;

  const scope = ids.map(id => `let ${id};\n`).join("");

  const addProperties =
    tree.component.members.filter(t => t.type === "property")
      .map(t => `Component.addProperty(${name}.prototype, "${t.name}");\n`)
      .join("");

  return `
    const ${name} = () => {
      class ${name} extends ${tree.component.name} {
        super();

        ${scope}

        ${id} = this;

        ${members}
      }
      ${addProperties}
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
