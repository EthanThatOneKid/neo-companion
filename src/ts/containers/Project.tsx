import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '../background/store';
import { updateTitle, ProjectPayload } from '../background/store/project/actions';
import { IProject } from '../background/store/project/reducer';
import Editor from "./Editor";

interface IProjectProps {
	project: IProject;
	dispatch: Dispatch;
}

class Project extends React.Component<IProjectProps> {

	updateTitle(event: any) {
		const { value: title } = event.target;
		const payload: ProjectPayload = { title };
		this.props.dispatch(updateTitle(payload));
	}

	render() {
		return (
			<ProjectContainer>
				<Display>
					<TitleInput
						type="text"
						value={this.props.project.title}
						onChange={this.updateTitle.bind(this)}
					/>
					<Editor />
				</Display>
			</ProjectContainer>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		project: state.project,
	};
};

export default connect(mapStateToProps)(Project);

const ProjectContainer = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-width: 100px;
	padding: 5px;
	margin: 5px;
	background-color: ${p => p.theme.backgroundColor};
`;

const Display = styled('div')`
	font-size: 12pt;
	justify-self: center;
`;

const TitleInput = styled('input')`
`;