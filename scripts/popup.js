// Constants
const STATE = {
    play: "pause",
    pause: "play",
    record: "stop",
    stop: "record"
};

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
const sendMessage = message => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const [activeTab] = tabs;
        chrome.tabs.sendMessage(activeTab.id, { message });
    });
};

// Listeners
playButtonRef.addEventListener("click", event => {
    const state = event.target.textContent;
    event.target.textContent = STATE[state];
    if (state === "play") {
        sourceCode = editor.getValue();
        sendMessage({ state, sourceCode });
        // disable editor
    } else if (state === "pause") {
        sendMessage({ state });
        // enable editor
    }
});

// Main Process
console.log({ editor });
addLine("test test");