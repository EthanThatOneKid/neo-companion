// Content Script
console.log("Hello from Neo Companion");

// Runtime Listeners
chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log({ req, sender, res });
});