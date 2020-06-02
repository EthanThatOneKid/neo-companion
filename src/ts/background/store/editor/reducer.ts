import { Reducer} from 'redux';
import { convertInteractionToNeoCode } from './helpers';
import { EditorActions, PageInteraction } from './actions';

export interface IEditor {
	value: string[];
	lastInteractionAt: number;
	interaction?: PageInteraction;
	isPlaying: boolean;
	isRecording: boolean;
}

const interactionCooldown: number = 0.1 * 1000; // 100ms
const initialState: IEditor = {
	value: [],
	isPlaying: false,
	isRecording: false,
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
			if (state.isRecording && isCooldownReached && payload !== undefined && payload.interaction !== undefined) {
				const { interaction } = payload;
				const interactionCode = convertInteractionToNeoCode(interaction);
				if (interactionCode !== null) {
					state.value.push(interactionCode);
					state.lastInteractionAt = timestamp;
				}
				return { ...state, interaction };
			}
			return { ...state };

		case 'START_RECORDING':
			state.isRecording = true;
			return { ...state };

		case 'STOP_RECORDING':
			state.isRecording = false;
			return { ...state };
		
		case 'PLAY_SCRIPT':
			state.isPlaying = true;
			return { ...state };
		
		case 'PAUSE_SCRIPT':
			state.isPlaying = false;
			return { ...state };
		
		default:
			return { ...state };
	}
};

export default editor;
