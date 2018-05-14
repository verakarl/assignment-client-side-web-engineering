/**
 * Implement a dependency free global router for web browsers
 *
 * - It should allow static paths
 * - It should invoke function for "/" if defined on start
 * - It should have WILDCARD support * for catch all route
 * - It should never fail (provide error fallback)
 * - It should allow static redirects
 *
 * API:
 *
 * Static:
 * - page('/', index)
 *
 * Dynamic:
 * - page('/user/:user', show)
 * - page('/user/:user/edit', edit)
 * - page('/user/:user/album', album)
 * - page('/user/:user/album/sort', sort)
 *
 * Redirects:
 * - page('/home', index)
 * - page('/', '/home')
 *
 * Catch all:
 * - page('*', notfound)
 *
 * Start:
 * - page()
 */
const WILDCARD = '*';
const HOME = '/';

export function createRouter() {
  let window, history, document; 
  const routes = [];

  const init = params => {
    window = params.window
    document = window.document;
    history = window.history;
  }

  const router = (path, callback) => {
    typeof path === "object" ? init(path) : console.log("not init");
    if (path === "/" || path === "home") {
      router.current = HOME;
    }
    console.log(path === "/");
  };

  router.error = new Error();
  // console.log(router);

  // router.error = new Error('test');
  //    router.current = '/';
   return router;
 }

// inspired by page.js
