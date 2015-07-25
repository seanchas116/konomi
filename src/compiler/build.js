
function buildProperty(tree) {
  const block = () => {
    switch (tree.expr.type) {
      case "jsExpr":
        return `return ${tree.expr.content}`;
      case "jsBlock":
        return tree.expr.content;
    }
  }();
  const name = tree.name;
  return {name, block};
}

function buildEventListener(tree) {
  const type = tree.type;
  const event = tree.event.content;
  const block = tree.block.content;

  return {type, event, block}
}

function getId(members, scope) {
  const idTree = members.find(t => t.type === "id");
  if (idTree) {
    if (scope.indexOf(idTree.name) >= 0) {
      throw new Error(`ID "${idTree.name}" already used`);
    }
  }
  const id = idTree ? idTree.name : `__component_${scope.length}`;
  scope.push(id);
  return id;
}

function buildComponent(tree, {scope, className}) {
  const id = getId(tree.members, scope);
  className = className || `Class_${id}`;

  const members = buildMembers(tree.members, {scope})

  return {id, className, members};
}

function buildMembers(members, {scope}) {
  const componentTrees = members.filter(t => t.type === "component");
  const propertyTrees = members.filter(t => t.type === "property");
  const eventListenerTrees = members.filter(t => t.type === "on" || t.type === "prepend");

  const components = componentTrees.map(t => buildComponent(t, {scope}));
  const properties = propertyTrees.map(t => buildProperty(t));
  const eventListeners = eventListenerTrees.map(t => buildEventListener(t));

  return {components, properties, eventListeners};
}

function buildComponentDefinition(tree) {
  const scope = [];
  const component = buildComponent(tree.component, {scope, className: tree.name});

  return {
    type: "componentDefinition",
    component
  };
}

function buildRoot(tree) {
  switch (tree.type) {
    case "jsBlock": {
      return {
        type: "js",
        content: tree.content
      };
    }
    case "componentDefinition": {
      return buildComponentDefinition(tree);
    }
  }
}

export default
function build(trees) {
  return trees.map(buildRoot);
}
