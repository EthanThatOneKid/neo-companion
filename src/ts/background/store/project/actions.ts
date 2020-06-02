import { Action } from 'redux';

export type ProjectActionTypes = 'UPDATE_TITLE';
export interface ProjectPayload {
	title?: string;
}
export type ProjectActions = Action<ProjectActionTypes, ProjectPayload>;

const defaultProjectPayload: ProjectPayload = {
	title: ""
};

export const updateTitle = (payload: ProjectPayload = defaultProjectPayload): ProjectActions => ({ type: 'UPDATE_TITLE', payload });

