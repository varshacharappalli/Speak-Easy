import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const userStore = create((set, get) => ({
    selectedLang: null,
    selectedScen: null,
    
    setSelectedLang: async (lang) => {
        try {
            console.log("Sending language:", lang);
            const response = await axiosInstance.post('/auth/language', { lang });
            console.log("Server response:", response.data);
            set({ selectedLanguage: lang });
        } catch (error) {
            console.log(error.message);
        }
    },
    
    setSelectedScen: async (scen) => {
        try {
            const response = await axiosInstance.post('/auth/scenario', { scen });
            set({ selectedScenario: scen });
        } catch (error) {
            console.log(error.message);
        }
    },
    
    audio: null,
    
    getAIaudio: async () => {
        try {
            console.log("Requesting AI audio response...");
            
            // Clear previous audio URL if exists
            if (get().audio) {
                URL.revokeObjectURL(get().audio);
                set({ audio: null }); // Clear the audio state
            }
            
            // Add a timestamp to prevent caching
            const timestamp = new Date().getTime();
            
            const response = await axiosInstance.get(`/auth/airesponse?t=${timestamp}`, {
                responseType: 'blob',
            });
            
            console.log("AI response received:", response.status, response.headers);
            console.log("Response data type:", typeof response.data);
            console.log("Response data size:", response.data.size, "bytes");
            
            if (!response.data || response.data.size === 0) {
                console.error("Empty audio response received");
                throw new Error("Empty audio response received");
            }
            
            // Create a blob URL from the audio data
            // Use the content type from the response if available
            const contentType = response.headers['content-type'] || 'audio/mpeg';
            const audioBlob = new Blob([response.data], { type: contentType });
            const audioURL = URL.createObjectURL(audioBlob);
            
            console.log("Generated audio URL:", audioURL);
            
            // Update store with new audio URL
            set({ audio: audioURL });
            
            return audioURL;
        } catch (error) {
            console.error("Error fetching AI audio:", error);
            set({ audioError: error.message });
            throw error;
        }
    },
    
    userInput: null,
    
    setUserInput: async (audioFile) => {
        try {
          console.log("Uploading user audio file...");
          
          const formData = new FormData();
          formData.append("audioFile", audioFile);
          
          const response = await axiosInstance.post('/auth/conversation', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          console.log("User input uploaded successfully:", response.data);
          
          set({ userInput: audioFile });
          return response.data;
        } catch (error) {
          console.error("Error uploading user audio:", error.message);
          throw error;
        }
      }
}));