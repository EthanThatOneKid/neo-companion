// Content Script
console.log("Hello from Neo Companion");

chrome.runtime.sendMessage({
    from: "content",
    subject: "test"
});