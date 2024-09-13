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
      const paragraph = document.querySelectorAll('.dlWCEZ');
      console.log("paragrph: ",paragraph)
      const paragraphText=Array.from(paragraph).map((p) =>p.innerText).join(".")

      console.log("paragrphText: ",paragraphText)
      sendResponse({ text: paragraphText });
    }
  });