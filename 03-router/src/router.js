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
          const paramValues = result.slice(1, result.length);

					if (result == WILDCARD) {
						router.current = WILDCARD;
					}
          const params = {};

					paramValues.forEach((value, idx) => {
            params[route.params[idx]] = value;
					});

          router.current = route.path;
          route.callback({ params });
				}
			});
		}
	};

	const createDynamicRegex = (path) => {
		const pathParts = path.split('/').slice(1);
		const params = [];
		let regex = '';
		pathParts.forEach((part) => {
			if (part.charAt(0) === ':') {
				regex += '/?(.*)';
				params.push(part.substr(1));
			} else {
				regex += `/${part}`;
			}
		});
		return { regex, params };
	};

	const addRouteToRouter = (path, callback) => {
		const isInside = routes.some((route) => route.path === path);
		const routeDetails = createDynamicRegex(path);
		if (!isInside) {
			routes.push({
				path,
				regex: routeDetails.regex,
				params: routeDetails.params,
				callback
			});
		}
	};

	const router = (route, callback) => {
		// if(typeof callback === "string") {} router.current = callback
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
