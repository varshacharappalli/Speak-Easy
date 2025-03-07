import React, { useState } from 'react'

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-6">Select a Language</h1>

    <div className="space-x-4">
      <button
        className={`px-6 py-2 rounded-lg text-white ${
          selectedLanguage === "German" ? "bg-blue-700" : "bg-blue-500"
        } hover:bg-blue-700 transition`}
        onClick={() => setSelectedLanguage("German")}
      >
        German
      </button>

      <button
        className={`px-6 py-2 rounded-lg text-white ${
          selectedLanguage === "Spanish" ? "bg-green-700" : "bg-green-500"
        } hover:bg-green-700 transition`}
        onClick={() => setSelectedLanguage("Spanish")}
      >
        Spanish
      </button>

      <button
        className={`px-6 py-2 rounded-lg text-white ${
          selectedLanguage === "French" ? "bg-red-700" : "bg-red-500"
        } hover:bg-red-700 transition`}
        onClick={() => setSelectedLanguage("French")}
      >
        French
      </button>
    </div>

    {selectedLanguage && (
      <p className="mt-6 text-xl font-semibold">
        Selected Language: <span className="text-blue-600">{selectedLanguage}</span>
      </p>
    )}
  </div>
  )
}

export default Language
