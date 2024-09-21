import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import './App.css';
import axios from 'axios';

function App() {
  const [paragraphText, setParagraphText] = useState('');
  const [loader, setLoader] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getParagraphText' }, async (response) => {
        try {
          setLoader(true);
          if (response && response.text) {
            const response_data = await axios.post('http://127.0.0.1:8000/summarize', {
              content: response.text,
            });
            setParagraphText(response_data.data.summary);
          } else {
            setParagraphText('No tag found or unable to retrieve content.');
          }
        } catch {
          console.log('error');
        } finally {
          setLoader(false);
        }
      });
    });
  }, []);

  const words = paragraphText.split(' ');

  useEffect(() => {
    if (paragraphText) {
      const interval = setInterval(() => {
        // Check if we haven't reached the end of the words array
        if (currentWordIndex < words.length) {
          setCurrentSentence((prev) => prev + ' ' + words[currentWordIndex]); // Append the next word to the sentence
          setCurrentWordIndex((prevIndex) => prevIndex + 1); // Move to the next word
        } else {
          clearInterval(interval); // Stop the interval when done
        }

      }, 20); // Adjust delay as needed

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [currentWordIndex, paragraphText, words]);

  return (
    <div className="main-body">
      <h2>Page Paragraph</h2>
      {/* <p>{paragraphText}</p><br /> */}
      <p>{loader ? <MoonLoader size={40} color={'black'} /> : currentSentence}</p>
    </div>
  );
}

export default App;
