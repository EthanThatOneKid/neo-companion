import { Reducer} from 'redux';
import { EditorActions, PageInteraction } from './actions';

export interface IEditor {
	value: string[]
	interaction?: PageInteraction
}

const initialState: IEditor = {
	value: []
};

const editor: Reducer<IEditor, EditorActions> = (state = initialState, action: EditorActions) => {
	const { payload } = action;
	switch (action.type) {
		case 'NEW_LINE':
			if (payload !== undefined && payload.lines !== undefined && payload.index !== undefined && payload.index > -1) {
				state.value.splice(payload.index, 0, ...payload.lines);
				const { value } = state;
				return { value };
			}
			return { ...state };

		case 'REM_LINE':
			if (payload !== undefined && payload.index !== undefined  && payload.index > -1) {
				state.value.splice(payload.index, 1);
				const { value } = state;
				return { value };
			}
			return { ...state };

		case 'CHANGE':
			if (payload !== undefined && payload.value !== undefined) {
				const { value } = payload;
				return { value };
			}
			return { ...state };

		case 'INTERACT':
			if (payload !== undefined && payload.interaction !== undefined) {
				const { interaction } = payload;
				return { ...state, interaction };
			}
			return { ...state };
		
		default:
			return { ...state };
	}
};

export default editor;
