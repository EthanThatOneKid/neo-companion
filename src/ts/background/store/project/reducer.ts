import { Reducer} from 'redux';
import { ProjectActions } from './actions';

export interface IProject {
	title: string;
	isRecording: boolean;
	isPlaying: boolean;
}

const createRandomAlphaNum = (len: number = 5): string => {
	return Math.random().toString(36).substr(2, len);
};

const initialState: IProject = {
	title: `neo-project-${createRandomAlphaNum()}`,
	isRecording: false,
	isPlaying: false
};

const project: Reducer<IProject, ProjectActions> = (state = initialState, action: ProjectActions) => {
	const { payload } = action;
	switch (action.type) {
		case 'UPDATE_TITLE':
			if (payload !== undefined && payload.title !== undefined) {
				state.title = payload.title;
			}
			return { ...state };

		default:
			return { ...state };
	}
};

export default project;
