const simmer = (el: Element | null): string => {
	const path: string[] = [];
	while (el !== null && el.nodeType === Node.ELEMENT_NODE) {
		let selector: string = el.nodeName.toLowerCase();
		if (el.id !== undefined && el.id.length !== 0) {
			selector += `#${el.id}`;
			path.unshift(selector);
			break;
		} else {
			let sibling: Element | null = el;
			let nthType: number = 1;
			while (sibling = sibling.previousElementSibling) {
				if (sibling.nodeName.toLowerCase() === selector) {
					nthType++;
				}
			}
			if (nthType !== 1) {
				selector += `:nth-of-type(${nthType})`;
			}
		}
		path.unshift(selector);
		el = el.parentNode as Element;
	}
	return path.join(" > ");
};

export default simmer;