import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import { configureApp } from './AppConfig';
import reducers, { loadState } from './store';

const getReduxDevtoolsExtensionConfig = () => {
	return undefined;
	// if (window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) {
	// 	return window.__REDUX_DEVTOOLS_EXTENSION__();
	// }
};

const preloadedState = loadState();
const store = createStore(reducers, preloadedState, getReduxDevtoolsExtensionConfig());

configureApp(store);
wrapStore(store);

export default store;