import { Action } from 'redux';

export type ProjectActionTypes = 'UPDATE_TITLE' | 'START_RECORDING' | 'STOP_RECORDING';
export interface ProjectPayload {
	title?: string;
	isRecording?: boolean;
}
export type ProjectActions = Action<ProjectActionTypes, ProjectPayload>;

const defaultProjectPayload: ProjectPayload = {
	title: "",
	isRecording: false
};

export const updateTitle = (payload: ProjectPayload = defaultProjectPayload): ProjectActions => ({ type: 'UPDATE_TITLE', payload });
export const startRecording = (payload: ProjectPayload = defaultProjectPayload): ProjectActions => ({ type: 'START_RECORDING', payload });
export const stopRecording = (payload: ProjectPayload = defaultProjectPayload): ProjectActions => ({ type: 'STOP_RECORDING', payload });

