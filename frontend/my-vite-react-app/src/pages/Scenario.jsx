import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';

const Scenario = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const { setSelectedScen } = userStore();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || '';
  const navigate = useNavigate();
  
  const scenarios = [
    {
      id: 'Shopping',
      title: 'Shopping',
      description: 'Learn how to ask about prices, sizes, and navigate a store.',
      image: '/src/images/shopping.jpg'
    },
    {
      id: 'Restaurant',
      title: 'Restaurant',
      description: 'Reserve a table, order food, and pay the bill.',
      image: '/src/images/restaurant.jpg'
    },
    {
      id: 'TrainStation',
      title: 'Train Travel',
      description: 'Buy tickets, check schedules, and ask for directions.',
      image: '/src/images/trainstation.jpg',
    }
  ];
  
  const handleScenarioSelect = (scenarioId) => {
    setSelectedScen(scenarioId);
    setSelectedScenario(scenarioId);
    localStorage.setItem('selectedScenario', scenarioId);
  };
  
  const handleStartPracticing = () => {
    // Navigate to the conversation page
    navigate('/conversation');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center">
          <div className="md:w-1/2">
            <img 
              src="/src/images/main.jpg" 
              alt="Conversation practice" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Practice {selectedLanguage} in Real Scenarios
            </h1>
            <p className="text-gray-600">
              Choose a scenario below to start practicing {selectedLanguage} in context. Each scenario provides relevant vocabulary and common phrases for real-life situations.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Scenario</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioSelect(scenario.id)}
              className={`bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-300 flex flex-col ${
                selectedScenario === scenario.id 
                  ? "border-indigo-500 ring-2 ring-indigo-200" 
                  : "border-gray-100 hover:shadow-lg hover:border-indigo-200"
              }`}
            >
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={scenario.image} 
                  alt={scenario.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 text-4xl">
                  {scenario.icon}
                </div>
                {selectedScenario === scenario.id && (
                  <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-gray-600 text-sm">{scenario.description}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Getting Help & Directions</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            These scenarios will help you practice asking for help and directions when you are
            in a new place and need assistance finding your way around.
          </p>
          <button 
            disabled={!selectedScenario}
            onClick={handleStartPracticing}
            className={`mt-6 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              selectedScenario 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Start Practicing
          </button>
        </div>
      </main>
    </div>
  );
};

export default Scenario;