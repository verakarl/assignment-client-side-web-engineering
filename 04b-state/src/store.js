import { isPlainObject } from './utils/is-plain-object';

/**
 * Implement a predictable state container (inspired by Redux):
 *
 * 1. The should be created by a `createStore` factory (use Crockford's Object creation pattern: https://www.youtube.com/watch?v=PSGEjv3Tqo0)
 * 2. The store object returned should provide `dispatch`, `subscribe` and `getState` methods
 * 3. Reducers must always be functions!
 * 4. Actions must always be plain objects!
 * 5. A store can have more than one subscriber
 * 6. Ensures immutability of listeners is guaranteed during a dispatch cycle
 * 7. Allows nested dispatch
 * 8. Does not leak listeners
 * 9. Does not allow dispatch(), getState(), subscribe(), unsubscribe() from within a reducer
 * 13. Recovers from errors
 * 14. Throws if action type is missin or undefined and not if falsy
 */
export function createStore(reducer, state) {
	if (typeof reducer !== 'function') {
		throw 'This reducer is not a function';
	}

	const listeners = {};
	const store = reducer;

	const dispatch = (action) => {
		if (isPlainObject(action) === false) {
			throw 'This is not a plain object';
    } 
    else if (action.type === undefined) {
			throw 'Action type is missing';
    }
    else if (action.type === false || action.type === null || action.type === 0 || action.type === '') {
			return new Error('Action type is wrong');
		}

		state = reducer(state, action);

		for (let key in listeners) {
			if (listeners[key] && listeners[key].unsubscribed) {
				listeners[key] = undefined;
			}
		}

		for (let key in listeners) {
			if (listeners[key]) {
				listeners[key].fn.bind(undefined)(); // call callback and bind undefined
			}
		}
	};

	const subscribe = (fn) => {
    // generate random string as a key to store the subscribers (Source for the random key function: https://gist.github.com/6174/6062387)
		const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		listeners[key] = { 
      fn, 
      unsubscribed: false 
    };
		return () => listeners[key].unsubscribed = true; // unsubscribe
	};

	const getState = () => state;

	store.dispatch = dispatch;
	store.subscribe = subscribe;
	store.getState = getState;

	return Object.freeze({
		dispatch,
		subscribe,
		getState
	});
}
