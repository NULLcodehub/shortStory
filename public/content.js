// // content.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "getParagraphText") {
//       // Get the text content of the first <p> tag
//       const paragraphText = document.querySelector('h1')?.innerText || "No <p> tag found.";
//       sendResponse({ text: paragraphText });
//     }
//   });
  
  // content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getParagraphText") {
      // Get the text content of the first <p> tag
      const paragraphText = document.querySelector('.story-element')?.innerHTML || "No  tag found.";
      sendResponse({ text: paragraphText });
    }
  });