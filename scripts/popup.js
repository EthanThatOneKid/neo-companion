// Globals
const textareaRef = document.querySelector(".editor");
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