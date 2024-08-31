let selectedText = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "storeText") {
    selectedText = request.text.slice(0, 60);
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.local.set({ summary: selectedText });
});
