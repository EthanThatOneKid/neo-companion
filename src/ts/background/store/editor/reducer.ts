import { Reducer} from 'redux';
import { convertInteractionToNeoCode } from './helpers';
import { EditorActions, PageInteraction } from './actions';

export interface IEditor {
	value: string[];
	lastInteractionAt: number;
	interaction?: PageInteraction;
}

const interactionCooldown: number = 0.1 * 1000; // 100ms
const initialState: IEditor = {
	value: [],
	lastInteractionAt: Date.now()
};

const editor: Reducer<IEditor, EditorActions> = (state = initialState, action: EditorActions) => {
	const { payload } = action;
	switch (action.type) {
		case 'NEW_LINE':
			if (payload !== undefined && payload.lines !== undefined && payload.index !== undefined && payload.index > -1) {
				state.value.splice(payload.index, 0, ...payload.lines);
			}
			return { ...state };

		case 'REM_LINE':
			if (payload !== undefined && payload.index !== undefined  && payload.index > -1) {
				state.value.splice(payload.index, 1);
			}
			return { ...state };

		case 'CHANGE':
			if (payload !== undefined && payload.value !== undefined) {
				const { value } = payload;
				state.value = [...value];
			}
			return { ...state };

		case 'INTERACT':
			const timestamp = Date.now();
			if (state.lastInteractionAt === undefined) {
				state.lastInteractionAt = timestamp - interactionCooldown;
			}
			const isCooldownReached = timestamp > state.lastInteractionAt + interactionCooldown;
			const isRecording = true;
			// TODO: Move START_RECORDING and STOP_RECORDING to this state for easier access
			// OR: Pass state between reducers like https://itnext.io/passing-state-between-reducers-in-redux-318de6db06cd
			if (isRecording && isCooldownReached && payload !== undefined && payload.interaction !== undefined) {
				const { interaction } = payload;
				const interactionCode = convertInteractionToNeoCode(interaction);
				if (interactionCode !== null) {
					state.value.push(interactionCode);
					state.lastInteractionAt = timestamp;
				}
				return { ...state, interaction };
			}
			return { ...state };
		
		default:
			return { ...state };
	}
};

export default editor;
