/**
 * Implement
 */
const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/;
const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

function hydrateVariableNode(map, name, value) {
  if (map.has(name)) {
    map.get(name).nodeValue = value;
  }
}

function createVariableNode(map, name) {
  if (!map.has(name)) {
    map.set(name, document.createTextNode(''));
  }
  return map.get(name);
}

function create(str) {
  // invalid string
  if (typeof str !== "string") {
    new Error(`Invalid template string: ${str}.`);
  }

  // node
  const node = {};
  const nodes = new Map();
  node.update = function (data) {
    // invoke possible nested updates
    const r = node.update.update
    if (typeof r === "function") {
      r.apply(node, [data]);
    }

    // update nodes on this layer
    Object
      .keys(data)
      .forEach(k => {
        hydrateVariableNode(nodes, k, data[k])
      });

    return node.el;
  }

  // create a variable node
  if (str) {
    const variable = str.match(MATCH_VARIABLE);
    if (variable) {
      const [s, name] = variable;
      node.el = createVariableNode(nodes, name);
      return node;
    }
  }

  // create a text node
  const result = str.match(MATCH_ELEMENT);
  if (result === null) {
    node.el = document.createTextNode(str);
    return node;
  }

  // destructure match
  const [match, tag, child] = result;

  // create node
  const { el: cnode, update: cupdate } = create(child);

  node.el = document.createElement(tag);
  node.el.appendChild(cnode);
  node.update.update = cupdate;

  return node;
}

export function build(template) {
  const { update } = create(template);
  return update
}
