import { Action } from 'redux';

export type EditorActionTypes = 'NEW_LINE' | 'REM_LINE' | 'CHANGE';
export interface EditorPayload {
	value: string[],
	index?: number,
	lines?: string[]
}
export type EditorActions = Action<EditorActionTypes, EditorPayload>;

const defaultEditorPayload: EditorPayload = {
	value: [],
	index: -1,
	lines: []
};

export const newLine = (payload: EditorPayload = defaultEditorPayload) => ({ type: 'NEW_LINE', payload });
export const removeLine = (payload: EditorPayload = defaultEditorPayload) => ({ type: 'REM_LINE', payload });
export const change = (payload: EditorPayload = defaultEditorPayload) => ({ type: 'CHANGE', payload });
