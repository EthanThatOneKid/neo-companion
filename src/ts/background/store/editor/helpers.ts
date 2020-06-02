import { PageInteraction } from './actions';

export const convertInteractionToNeoCode = ({ selector, click }: PageInteraction): string | null=> {
	if (click && !selector.includes("#neo-root")) {
		return `click ${selector}`;
	}
	return null;
};