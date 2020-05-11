import { Action } from 'redux';

export type EditorActionTypes = 'NEW_LINE' | 'REM_LINE' | 'CHANGE';
export type EditorPayload = string[];

export type EditorActions = Action<EditorActionTypes, EditorPayload>;

export const newLine = (payload: EditorPayload = []) => ({ type: 'NEW_LINE', payload });
export const removeLine = (payload: EditorPayload = []) => ({ type: 'REM_LINE', payload });
export const change = (payload: EditorPayload = []) => ({ type: 'CHANGE', payload });
