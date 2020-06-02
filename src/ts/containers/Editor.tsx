import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '../background/store';
import { newLine, removeLine, change, startRecording, stopRecording, playScript, pauseScript, EditorPayload } from '../background/store/editor/actions';
import { IEditor } from '../background/store/editor/reducer';
import { default as SimpleCodeEditor } from 'react-simple-code-editor';

const lineBreak = "\n";
const shorten = (text: string, length: number, deliminator: string = "..."): string => {
	if (text.length <= length) {
		return text;
	}
	length -= deliminator.length;
	return text.slice(0, length * 0.5) + deliminator + text.slice(text.length - (length * 0.5));
};

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

	startRecording() {
		this.props.dispatch(startRecording());
	}

	stopRecording() {
		this.props.dispatch(stopRecording());
	}

	playScript() {
		this.props.dispatch(playScript());
	}

	pauseScript() {
		this.props.dispatch(pauseScript());
	}

	render() {
		return (
			<EditorContainer>
				<Display>
					<Menu>
						<li><a role="button">Import</a></li>
						<li><a role="button">Export</a></li>
						<li>
							{
								this.props.editor.isRecording
									? (
										<a role="button" onClick={this.stopRecording.bind(this)}>Stop Recording</a>
									) : (
										<a role="button" onClick={this.startRecording.bind(this)}>Start Recording</a>
									)
							}
						</li>
						<li>
							{
								this.props.editor.isPlaying
									? (
										<a role="button" onClick={this.pauseScript.bind(this)}>Pause Script</a>
									) : (
										<a role="button" onClick={this.playScript.bind(this)}>Play Script</a>
									)
							}
						</li>
					</Menu>
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
					<span>
						{this.props.editor.interaction?.click ? "Clicked " : ""}
						Current Element:
						{shorten(this.props.editor.interaction?.selector || "", 25)}
					</span>
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
	max-width: 400px;
	padding: 5px;
	margin: 5px;
	background-color: ${p => p.theme.backgroundColor};
`;

const Display = styled('div')`
	font-size: 12pt;
	justify-self: center;
`;

const Menu = styled('ul')`
	margin: 0;
	padding: 0;
	list-style: none;
`;