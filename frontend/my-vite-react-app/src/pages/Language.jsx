import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();
  const {setSelectedLang}=userStore();
  
  const languages = [
    { name: "German", icon: "🇩🇪" },
    { name: "Spanish", icon: "🇪🇸" },
    { name: "French", icon: "🇫🇷" }
  ];
  
  const handleDone = () => {
    if (selectedLanguage) {
      setSelectedLang(selectedLanguage);
      localStorage.setItem('selectedLanguage', selectedLanguage);
      navigate('/scenario'); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full border border-gray-100">
        <h1 className="text-3xl font-light text-center text-gray-800 mb-2">
          Select Your <span className="font-semibold">Language</span>
        </h1>
        <div className="w-16 h-1 bg-indigo-500 mx-auto mb-8 rounded-full"></div>
        
        <div className="space-y-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.name}
              className={`w-full px-6 py-4 rounded-full font-medium transition-all duration-300 flex items-center ${
                selectedLanguage === language.name 
                  ? "bg-indigo-600 text-white shadow-lg transform translate-y-0" 
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:shadow"
              }`}
              onClick={() => setSelectedLanguage(language.name)}
            >
              <span className="text-xl mr-4">{language.icon}</span>
              <span>{language.name}</span>
              {selectedLanguage === language.name && (
                <span className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            className={`px-10 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedLanguage 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleDone}
            disabled={!selectedLanguage}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Language;
