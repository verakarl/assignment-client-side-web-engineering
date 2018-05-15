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

	const init = (params) => {
		window = params.window;
		document = window.document;
		history = window.history;

		window.addEventListener('popstate', onPopState, false);

		function onPopState(e) {
			const { pathname } = document.location;
			routes.forEach((route) => {
        const result = pathname.match(route.regex);
        if (result !== null) {
          router.current = route.path;
          route.callback();
        }
			});
		}
	};

	const addRouteToRouter = (path, callback) => {
		const isInside = routes.some((route) => route.path === path);
		if (!isInside) {
      const pathParts = path.split('/').slice(1);
      let regex = '';
			pathParts.forEach((part) => {
        if (part.charAt(0) === ':'){
          regex += '/?(.*)';
        } else {
          regex += `/${part}`;
        }
      });

			routes.push({
        path,
        regex,
				callback
			});
		}

		// router.current = path;
	};

	const router = (route, callback) => {
		typeof route === 'object' ? init(route) : addRouteToRouter(route, callback);
	};

	router.error = new Error();
	router.current = '/';
	return router;
}

// inspired by page.js

// reagieren auf onpopstate, router nocheinmal initialisieren und route nochmal rein. event.preventDefault()

// link, click und start

// document.location.pathnam (Stringvergleich)
