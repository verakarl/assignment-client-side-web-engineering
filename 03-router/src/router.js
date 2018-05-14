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

  const addRouteToRouter = (path, cb) => {
    routes.some(route => route.path === path) ? console.log("route already saved") : routes.push({path});
    console.log(routes)
    if (path === "/") {
      router.current = HOME;
      console.log('case1')
    }
    else if (path === "/home") {
      router.current = '/home'
      console.log('case2')
    }
  }

  const router = (path, callback) => {
    typeof path === 'object' ? init(path) : addRouteToRouter(path, callback);
  };

  router.error = new Error();
  console.log(routes);
  
  return router;
 }

// inspired by page.js
