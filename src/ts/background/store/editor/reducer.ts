import { Reducer} from 'redux';
import { EditorActions } from './actions';

export interface IEditor {
	value: string[]
}

const initialState: IEditor = {
	value: []
};

const editor: Reducer<IEditor, EditorActions> = (state = initialState, action: EditorActions) => {
	const { payload } = action;
	switch (action.type) {
		case 'NEW_LINE':
			if (payload.lines !== undefined && payload.index !== undefined) {
				payload.value.splice(payload.index, 0, ...payload.lines);
				const { value } = payload;
				return { value };
			}
			return { ...state };

		case 'REM_LINE':
			if (payload.index !== undefined) {
				payload.value.splice(payload.index, 1);
				const { value } = payload;
				return { value };
			}
			return { ...state };

		case 'CHANGE':
			const { value } = payload;
			return { value };
		
		default:
			return { ...state };
	}
};

export default editor;
