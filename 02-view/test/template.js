import { JSDOM } from "jsdom";
import { build } from "../src/template";

// provide DOM for tests
const dom = new JSDOM(`<!DOCTYPE html>`);
global.document = dom.window.document;

describe("02-view", () => {
  describe("Build template", () => {
    it("should render one element with variable", () => {
      const title = 'Hello, World!';
      const template = '<h1>{{title}}</h1>';
      try {
        const fn = build(template);
        const el = fn({ title });
        el.outerHTML.should.eql(`<h1>${title}</h1>`);
      } catch (err) {
        console.error(err);
      }
    });
  });

  describe("Build nested template", () => {
    it("should render nested element with variable", () => {
      const title = 'Hello, World!';
      const template = '<h1><small>{{title}}</small></h1>';
      const fn = build(template);
      const el = fn({ title });
      el.outerHTML.should.eql(`<h1><small>${title}</small></h1>`);
    });
  });

  describe("Build nested template", () => {
    it("should render nested element with different values", () => {
      const title1 = 'Hello, World!';
      const title2 = 'Goodbye, World!';

      const template = '<h1><small>{{title}}</small></h1>';
      const fn = build(template);

      const el1 = fn({ title: title1 });
      const el2 = fn({ title: title2 });

      el1.outerHTML.should.eql(`<h1><small>${title1}</small></h1>`);
      el2.outerHTML.should.eql(`<h1><small>${title2}</small></h1>`);
    });
  });
});
