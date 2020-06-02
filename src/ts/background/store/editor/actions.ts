import { Action } from 'redux';

export interface PageInteraction {
	selector: string,
	click?: boolean,
	navigation?: boolean
}

export type EditorActionTypes = 'NEW_LINE' | 'REM_LINE' | 'CHANGE' | 'INTERACT' | 'START_RECORDING' | 'STOP_RECORDING' | 'PLAY_SCRIPT' | 'PAUSE_SCRIPT';;
export interface EditorPayload {
	value?: string[],
	index?: number,
	lines?: string[],
	interaction?: PageInteraction,
	isPlaying?: boolean,
	isRecording?: boolean
}
export type EditorActions = Action<EditorActionTypes, EditorPayload>;

const defaultEditorPayload: EditorPayload = {
	value: [],
	index: -1,
	lines: []
};

export const newLine = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'NEW_LINE', payload });
export const removeLine = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'REM_LINE', payload });
export const change = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'CHANGE', payload });
export const interact = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'INTERACT', payload });
export const startRecording = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'START_RECORDING', payload });
export const stopRecording = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'STOP_RECORDING', payload });
export const playScript = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'PLAY_SCRIPT', payload });
export const pauseScript = (payload: EditorPayload = defaultEditorPayload): EditorActions => ({ type: 'PAUSE_SCRIPT', payload });