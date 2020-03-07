// Element References
const textareaRef = document.querySelector(".editor");
const playButtonRef = document.querySelector(".play-button");
const recordButtonRef = document.querySelector(".record-button");

// Globals
const editorOptions = {
    theme: "neo",
    lineWrapping: true,
    lineNumbers: true
};
const editor = CodeMirror.fromTextArea(textareaRef, editorOptions);

// Helpers
const addLine = (line = "") => {
    const lastLine = editor.getLine(editor.lastLine());
    const mustBreakLine = lastLine.length > 0;
    const nextValue = `${editor.getValue()}${mustBreakLine ? "\n" : ""}${line}`;
    editor.setValue(nextValue);
};

// Main Process
console.log({ editor });
addLine("test test");