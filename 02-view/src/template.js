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


function createElement(nodeMap, template) {
  const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
  const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

  let test, name;
  let outerNode;
 //  console.log(template)
  let [match, tag, variable] = MATCH_ELEMENT.exec(template);
  // console.log(match, tag, variable);
  // let result = MATCH_ELEMENT.exec(template);
 //  console.log(result)
  // if (MATCH_ELEMENT.exec(variable) !== null) {
  //   console.log('match was not null', MATCH_ELEMENT.exec(variable) );
  // }
  // let resultMatchElement = MATCH_ELEMENT.exec(template);
  // console.log(resultMatchElement)MATCH_VARIABLE
  if (MATCH_VARIABLE.exec(variable) === null) {
    // console.log(variable);
    let variable2;
    outerNode = document.createElement(tag);
    match, tag, variable2 = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g.exec(variable);
    
    let [innerMatch, innerTag, innerVariable] = variable2;
    name = /^\{\{(.+)\}\}$/.exec(innerVariable);
    tag = innerTag;
  }
  else {
    // console.log(' i am here ')
    name = MATCH_VARIABLE.exec(variable);
    // console.log(name[1])
  }
  // console.log(name)
  if (tag) {
    return createHTML(outerNode, tag, name[1], nodeMap);
  } 
}

function createHTML(outerNode, tag, name, nodeMap) {
  let node;
  // let newNode;
  node = document.createElement(tag);
  // console.log(outerNode, tag)
  let text = document.createTextNode(nodeMap.get(name));
  node.appendChild(text);
  console.log(outerNode, node)
  if (outerNode !== undefined) {
    outerNode.appendChild(node);
    return { el: outerNode };
  }
  return { el: node };
}

export function build(template) {
	return obj => {
    let nodeMap = new Map();
    for (let prop in obj) {
      nodeMap.set(prop, obj[prop]);
    }
    return createElement(nodeMap, template);
	};
}

