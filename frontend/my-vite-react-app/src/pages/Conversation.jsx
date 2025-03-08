import React, { useState, useRef, useEffect } from 'react';
import { userStore } from '../store/userStore';

const Conversation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState(null);
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);
  
  const { 
    audio, 
    getAIaudio, 
    userInput, 
    setUserInput,
    selectedLang,
    selectedScen
  } = userStore();

  useEffect(() => {
    const fetchInitialResponse = async () => {
      try {
        console.log("Fetching initial AI response on mount...");
        setIsResponding(true);
        await getAIaudio();
      } catch (err) {
        console.error("Error fetching initial AI response:", err);
        setError("Failed to fetch initial AI response");
      } finally {
        setIsResponding(false);
      }
    };

    if (selectedLang && selectedScen) {
      fetchInitialResponse();
    }
  }, [selectedLang, selectedScen]);

  useEffect(() => {
    console.log("Audio updated:", audio);
    if (audio) {
      console.log("Adding AI audio to conversation");
      setConversation(prev => [...prev, { 
        role: 'ai',
        content: 'AI audio response',
        audio: audio,
        timestamp: new Date().toISOString()
      }]);
      setIsResponding(false);
      setError(null);
      
      const audioEl = new Audio(audio);
      audioEl.onerror = (e) => {
        console.error("Audio playback error:", e);
        setError("Failed to play audio");
      };
      audioEl.onloadedmetadata = () => {
        console.log("Audio duration:", audioEl.duration, "seconds");
      };
    }
  }, [audio]);
  
  const handleAudioSubmit = async () => {
    try {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      
      const audioFile = new File([audioBlob], "user-audio.webm", { type: 'audio/webm' });
      
      const userAudioURL = URL.createObjectURL(audioBlob);
      console.log("Created user audio URL:", userAudioURL);
      
      setConversation(prev => [...prev, { 
        role: 'user',
        content: 'Audio message sent',
        audio: userAudioURL,
        timestamp: new Date().toISOString()
      }]);
      
      setIsResponding(true);
      setError(null);
      
      console.log("Uploading user audio...");
      await setUserInput(audioFile);
      
      console.log("Fetching AI audio response...");
      await getAIaudio();
    } catch (error) {
      console.error("Error in conversation flow:", error);
      setIsResponding(false);
      setError(`Error: ${error.message}`);
      
      setConversation(prev => [...prev, { 
        role: 'system',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      
      mediaRecorder.current.onstop = handleAudioSubmit;
      
      audioChunks.current = [];
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Could not access microphone. Please check permissions.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const fetchAIAudio = async () => {
    try {
      setIsResponding(true);
      await getAIaudio();
    } catch (err) {
      console.error("AI fetch error:", err);
      setError(`AI fetch error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {(selectedLang || selectedScen) && (
        <div className="bg-white p-2 text-center border-b shadow-sm">
          {selectedLang && <span className="mr-4">Language: {selectedLang}</span>}
          {selectedScen && <span>Scenario: {selectedScen}</span>}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4 mt-2">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <div className="bg-gray-200 p-2 flex justify-center">
        <button 
          onClick={fetchAIAudio}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          disabled={isResponding}
        >
          {isResponding ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            "Get AI Input"
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
              message.role === 'user' ? 'bg-blue-500 text-white' : 
              message.role === 'system' ? 'bg-red-500 text-white' : 'bg-white shadow'
            }`}>
              <p>{message.content}</p>
              {message.audio && (
                <div>
                  <audio 
                    controls 
                    className="mt-2 w-full"
                    onError={(e) => console.error("Audio element error:", e)}
                  >
                    <source 
                      src={message.audio} 
                      type={message.role === 'user' ? "audio/webm" : "audio/mpeg"} 
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="text-xs mt-1 text-gray-600">
                    {message.timestamp}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {isResponding && (
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gray-200 rounded-full w-20 h-20 flex justify-center items-center mb-4">
            <div className="flex space-x-1">
              <div className={`w-2 h-8 bg-blue-600 rounded-full animate-pulse`}></div>
              <div className={`w-2 h-8 bg-blue-600 rounded-full animate-pulse delay-75`}></div>
              <div className={`w-2 h-8 bg-blue-600 rounded-full animate-pulse delay-150`}></div>
            </div>
          </div>
          <div className="text-center text-gray-600">
            Waiting for AI response...
          </div>
        </div>
      )}
      
      <div className="flex justify-center items-center p-4 border-t border-gray-300 bg-white">
        <button 
          onClick={toggleRecording}
          className={`flex justify-center items-center w-16 h-16 rounded-full focus:outline-none ${
            isRecording ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          disabled={isResponding}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-8 h-8 text-gray-700"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Conversation;