import { WSAENAMETOOLONG } from "constants";

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

// // const template = '<h1>{{title}}</h1><h2>Subline</h2>';
// let nodeMap = new Map();
// do { 
//   let [match, tag, variable] = MATCH_ELEMENT.exec(template);
//   let [input, name] = MATCH_VARIABLE.exec(variable);
//   if (name) {
//     mapLookUp(nodeMap, name);
//     console.log(nodeMap);
//     // createNode
//     // build(template);
//   }
// } while (tag)

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
  return html => {
    // let nodeMap = new Map();
    //   let [match, tag, variable] = MATCH_ELEMENT.exec(template);
    //   let [input, name] = MATCH_VARIABLE.exec(variable);
    //   if (name) {
    //     mapLookUp(nodeMap, name);
    //     console.log(nodeMap);
    //     // createNode
    //     // build(template);
    //   }
    // createElementInTree(html)
    console.log(template)
    console.log('HTML', html);
    return template
  }
}

// template + update function soll returniert werden (zweiter durchgang schneller als erster)
// reskursiver aufruf (nodes von außen nach innen geparst und äußerstes zurück geben)
// update triggert update von innerem node usw..
// in der update function muss man wissen welche knoten upgedatet werden
// liste von variablen muss gehalten werden
// Flow: update -> variable --> schau in dom tree wo die variable is -> und update dann wo es vorkommt (Map, referenz auf node der sowieso schon erzeugt wird wird gespeichert, Key der Map ist variablenname)

// str.match(MATCH_VARIABLE) -> create Variable Node
// wenn string --> und {} enthält  = textnode variable
// speicher in aktuellen node 


// wenn str.match(MATCH_ELEMENT) == null dann ist es textnode (update ist nicht notwendig weil statisch)

// hydrate() -> ersetze variable durch text 
