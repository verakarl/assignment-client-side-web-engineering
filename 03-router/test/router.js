import { createWindow, changeLocation, clickLink } from "./dom";
import { createRouter } from "../src/router";

const BASE_URL = "https://example.org";

describe("03-router", () => {
  describe("config", () => {
    it("should create and start router with no routes", () => {
      const { dom, window } = createWindow({
        url: `${BASE_URL}/`
      });

      const router = createRouter();
      router({ window });

      changeLocation(dom, BASE_URL); // ändert document location im jsdom (brauchen wir nicht)
      router.error.should.be.an.Error(); // router.current: aktuelleRoute || (in der show function )

    });

    it("should create and start router with default route", () => {
      const { dom, window } = createWindow({
        url: `${BASE_URL}/`
      });

      const router = createRouter();
      router("/", () => {});
      router({ window });

      router.current.should.eql("/");
    });
  });

  describe("static", () => {
    it("should create and start router with home route: /", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router({ window });

      changeLocation(dom, BASE_URL);
      router.current.should.eql("/");

      changeLocation(dom, `${BASE_URL}/`);
    });

    it("should create and start router with static route: /home", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/home", () => {});
      router({ window });

      changeLocation(dom, `${BASE_URL}/home`);
      router.current.should.eql("/home");
    });

    it("should create and start router with two static routes: / and /home", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      changeLocation(dom, `${BASE_URL}/home`);
      router.current.should.eql("/home");
      changeLocation(dom, `${BASE_URL}`);
      router.current.should.eql("/");
    });

    it("should invoke function for route: /home", done => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/home", () => done());
      router({ window });

      changeLocation(dom, `${BASE_URL}/home`);
    });
  });

  describe("dynamic", () => {
    it("should create and start router with dynamic route: /users/:id",
      () => {
        const { dom, window } = createWindow({
          url: `${BASE_URL}/`
        });

        const router = createRouter();
        router("/users/:userid", () => {});
        router({ window });

        changeLocation(dom, `${BASE_URL}/users/1`);
        router.current.should.eql("/users/:userid");
      }
    );

    it("should create and start router with dynamic route: /users/:id/tasks/:taskid", () => {
      const { dom, window } = createWindow({
        url: `${BASE_URL}/`
      });

      const router = createRouter();
      router("/users/:userid/tasks/:taskid", () => {});
      router({ window });

      changeLocation(dom, `${BASE_URL}/users/1/tasks/1`);
      router.current.should.eql("/users/:userid/tasks/:taskid");
    });

    it("should invoke function for: /users/:userid/tasks/:taskid", done => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/users/:userid/tasks/:taskid", () => done());
      router({ window });

      changeLocation(dom, `${BASE_URL}/users/1/tasks/1`);
    });

    it("should check param value in context:: /users/:userid → 1", done => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/users/:userid", ctx => {
        ctx.params.userid.should.eql("1");
        done();
      });
      router({ window });

      changeLocation(dom, `${BASE_URL}/users/1`);
    });
  });

  describe("catch all", () => {
    it("should catch location /home", done => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("*", () => done());
      router({ window });

      changeLocation(dom, `${BASE_URL}/home`);
    });
  });

  describe("redirect", () => {
    it.skip("should redirect / to /home", done => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", "/home");
      router("/home", () => done());
      router("*", () => done(new Error("Route not redirected")));
      router({ window });
    });
  });

  describe("links", () => {
    it.skip("should open /home on click", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "a1");
      router.current.should.eql("/home");
    });

    it.skip("should not open /home on click", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "a2");
      router.current.should.eql("/");
    });

    it.skip("should not open /home on click", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "a3");
      router.current.should.eql("/");
    });

    it.skip("should not open /home on click", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "a4");
      router.current.should.eql("/");
    });

    it.skip("should not open /home on click", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "a5");
      router.current.should.eql("/");
    });
  });

  describe("history", () => {
    it.skip("should change history", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {});
      router({ window });

      clickLink(dom, "b2");
      router.current.should.eql("/home");
      clickLink(dom, "b1");
      router.current.should.eql("/");
      window.history.length.should.eql(3);
    });

    it.skip("should change history and go back", () => {
      const { dom, window } = createWindow({ url: `${BASE_URL}/` });

      const router = createRouter();
      router("/", () => {});
      router("/home", () => {
        window.history.back();
        window.history.length.should.eql(2);
        router.current.should.eql("/");
      });
      router({ window });

      clickLink(dom, "b2");
      router.current.should.eql("/home");
    });
  });
});
