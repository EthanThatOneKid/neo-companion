import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '../background/store';
import { newLine, removeLine, change, EditorPayload } from '../background/store/editor/actions';
import { IEditor } from '../background/store/editor/reducer';
import { default as SimpleCodeEditor } from 'react-simple-code-editor';

const lineBreak = "\r\n";

interface IEditorProps {
	editor: IEditor;
	dispatch: Dispatch;
}

class Editor extends React.Component<IEditorProps> {
	
	newLine() {
		this.props.dispatch(newLine());
	}

	removeLine() {
		this.props.dispatch(removeLine());
	}

	change(value: IEditor["value"]) {
		const payload: EditorPayload = { value };
		this.props.dispatch(change(payload));
	}

	render() {
		return (
			<EditorContainer>
				<SimpleCodeEditor
					value={this.props.editor.value.join(lineBreak)}
					onValueChange={code => this.change(code.split(lineBreak))}
					highlight={code => code}
					padding={10}
					style={{
						fontFamily: '"Fira code", "Fira Mono", monospace',
						fontSize: 12,
					}}
				/>
			</EditorContainer>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		editor: state.editor,
	};
};

export default connect(mapStateToProps)(Editor);

const EditorContainer = styled('div')`
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
	font-size: 48px;
	justify-self: center;
`;

const Controls = styled('div')`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	min-width: 200px;
`;

const Button = styled('button')`
	display: inline-block;
	position: relative;
	padding: 10px 30px;
	border: 1px solid transparent;
	border-bottom: 4px solid rgba(0,0,0,0.21);
	border-radius: 4px;
	background: linear-gradient(rgba(27,188,194,1) 0%, rgba(24,163,168,1) 100%);

	color: white;
	font-size: 22px;
	text-shadow: 0 1px 0 rgba(0,0,0,0.15);
	text-decoration: none;

	cursor: pointer;
	outline: none;
	user-select: none;

	&:active {
		background: #169499;
	}
`;
