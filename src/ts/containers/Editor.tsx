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
				<Display>
					<SimpleCodeEditor
						value={this.props.editor.value.join(lineBreak)}
						onValueChange={code => this.change(code.split(lineBreak))}
						highlight={code => code}
						padding={10}
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							fontSize: 12,
							fontVariantLigatures: 'common-ligatures',
							backgroundColor: '#fafafa',
							borderRadius: '3px',
						}}
					/>
					<span>Current Element: {this.props.editor.interaction?.selector || ""}</span>
				</Display>
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