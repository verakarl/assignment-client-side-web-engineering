/*
 * Implement a view engine:
 *
 * - Parse HTML string
 * - Create according elements: node, text, variable
 * - Implement update function
 *
 * API:
 *
 * const template = build('<h1>{{title}}</h1>');
 * const {el, update} = template({title: 'Hello, World!'});
 * el.outerHTML // <h1>Hello, World!</h1>
 * update({title: 'Hallo Welt!'});
 * el.outerHTML // <h1>Hallo, Welt!</h1>
 */

let dom;
function createElement(nodeMap, template) {
	const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
	const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

	let [ match, tag, variable ] = MATCH_ELEMENT.exec(template);

	if (MATCH_VARIABLE.exec(variable) === null) {
		dom = document.createElement(tag);
		return createElement(nodeMap, variable);
	} else {
		let [ input, name ] = MATCH_VARIABLE.exec(variable);
		let node = document.createElement(tag);
		let text = document.createTextNode(nodeMap.get(name));
		node.appendChild(text);

		if (dom) {
			dom.appendChild(node);
    } else {
      dom = node;
    }

		return { 
      el: dom,
      update
    };
	}
}

const update = (obj) => {
  for (let prop in obj) {
    dom.firstChild.textContent = obj[prop];
  }
}

export function build(template) {
	return (obj) => {
		let nodeMap = new Map();
		for (let prop in obj) {
			nodeMap.set(prop, obj[prop]);
		}
		return createElement(nodeMap, template);
  };
  
}
