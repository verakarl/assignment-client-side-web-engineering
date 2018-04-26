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

// const template = build("<h1>{{title}}</h1>");
// // const template = '<h1>{{title}}</h1><h2>Subline</h2>';
// // let tag;
// // do { 
// //   tag = MATCH_ELEMENT.exec(template);
// //   if (tag) {
// //     // createNode  
// //     build(template);
// //   }
// // } while (tag)

function createNode(tag) {
  let node = {};
  node.el = document.createElement(tag);
  node.el.appendChild(childNode);
  node.updateNode = childUpdate;
  console.log(node);
}

function createElementInTree(val) {
  let { 
    match, 
    tag, 
    child 
  } = template.match(MATCH_ELEMENT);

   if (match === null) {
     return;
   }
   do {
     tag = MATCH_ELEMENT.exec(template);
     console.log(tag);
     if (tag) {
   

       return node;
       // createNode
       // switch (tag) {
       //   case tag === text:
       //     //create Text Node
       //     document.createTextNode;
       //     break;
       //   case tag === variable:
       //     document.createTextNode;
       //     break;
       //   //create Variable Node
       //   default:
       //     document.createElement;
       //     break;
       // }
     }
   } while (tag);
}

export function build(template) {
  return html => {
    createElementInTree(html)
    console.log('HTML', html);
  }
}
