import { Z_DEFAULT_STRATEGY } from 'zlib';

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

const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

// function mapLookUp(nodeMap, variableName) {
//   if (nodeMap.has(variableName)) {
//     nodeMap.set(variableName, document.createTextNode(''));
//     console.log(nodeMap)
//   }
//   // console.log(nodeMap, variableName)
//   nodeMap.get(variableName);
// }

// function detectNodeType(node) {

// }

// const template = '<h1>{{title}}</h1><h2>Subline</h2>';
// let nodeMap = new Map();
// do {
// 	let [ match, tag, variable ] = MATCH_ELEMENT.exec(template);
// 	let [ input, name ] = MATCH_VARIABLE.exec(variable);
// 	if (name) {
// 		// mapLookUp(nodeMap, name);
// 		console.log(nodeMap);
// 		// createNode
// 		// build(template);
// 	}
// } while (tag);

// function createNode(tag) {
//   let node = {};
//   node.el = document.createElement(tag);
//   node.el.appendChild(childNode);
//   node.updateNode = childUpdate;
//   console.log(node);
// }

// function createElementInTree(val) {
//   let {
//     match,
//     tag,
//     child
//   } = template.match(MATCH_ELEMENT);

//    if (match === null) {
//      return;
//    }
//    do {
//      tag = MATCH_ELEMENT.exec(template);
//      console.log(tag);
//      if (tag) {

//        return node;
//        // createNode
//        // switch (tag) {
//        //   case tag === text:
//        //     //create Text Node
//        //     document.createTextNode;
//        //     break;
//        //   case tag === variable:
//        //     document.createTextNode;
//        //     break;
//        //   //create Variable Node
//        //   default:
//        //     document.createElement;
//        //     break;
//        // }
//      }
//    } while (tag);
// }

export function build(template) {
	return obj => {
    let nodeMap = new Map();
    for (let prop in obj) {
      nodeMap.set(prop, obj[prop]);
    }
    // console.log(nodeMap)

		// console.log(nodeMap, variableName)
		// do {
    // nodeMap.set(variable);

		let node;
		let [ match, tag, variable ] = MATCH_ELEMENT.exec(template);
		let [ input, name ] = MATCH_VARIABLE.exec(variable);
		if (tag) {
      node = document.createElement(tag);
      // nodeMap.get(name);
      let text = document.createTextNode(nodeMap.get(name));
      node.appendChild(text);
      console.log(tag)
			// mapLookUp(nodeMap, name);
			//console.log(nodeMap);
			// createNode
			// build(template);
			// }
			// } while (tag)
			// detectNodeType(node)
			// createDOM()
			// console.log(template);
			// console.log(obj);
			return {el: node};
		}
	};
}
