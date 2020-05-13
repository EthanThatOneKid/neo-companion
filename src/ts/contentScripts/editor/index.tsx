import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import NeoApp from './containers/NeoApp';
import simmer from './simmer';
import { createDomAnchor } from '../../scripts/dom';
import { interact, PageInteraction, EditorPayload } from '../../background/store/editor/actions';

createDomAnchor('neo-root');
const store = new Store();

const assignListeners = () => {
	const elementNodes = document.getElementsByTagName("*");
	for (let elementNodeIndex = 0; elementNodeIndex < elementNodes.length; elementNodeIndex++) {
		const elementNode = elementNodes[elementNodeIndex];
		elementNode.addEventListener("mouseenter", (event) => {
			const el = event.target as Element;
			const selector = simmer(el);
			const interaction: PageInteraction = { selector };
			const payload: EditorPayload = { interaction };
			store.dispatch(interact(payload));
		});
	}
};

store.ready().then(() => {
	assignListeners();
	ReactDOM.render(
		<Provider store={store}>
			<NeoApp />
		</Provider>,
		document.getElementById('neo-root')
	);
});
