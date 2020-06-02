import { Store } from 'redux';
import { IAppState, saveState } from './store';

const autoSaveAppState = (store: Store<IAppState>) => {
	chrome.tabs.onRemoved.addListener(() => saveState(store.getState()));
	chrome.windows.onRemoved.addListener(() => saveState(store.getState()));

	const saveFrequency = 30 * 1e4; // 30s
	setInterval(() => (saveState(store.getState())), saveFrequency);
};

export const configureApp = (store: Store<IAppState>) => {
	autoSaveAppState(store);
};
