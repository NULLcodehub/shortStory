import React, { useEffect, useState } from 'react';

function App() {
  const [paragraphText, setParagraphText] = useState('');

  useEffect(() => {
    // Send a message to the content script to get the <p> tag text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getParagraphText" }, (response) => {
        if (response && response.text) {
          setParagraphText(response.text);
        } else {
          setParagraphText("No <p> tag found or unable to retrieve content.");
        }
      });
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Page Paragraph</h2>
      <p>{paragraphText}</p>
    </div>
  );
}

export default App;

