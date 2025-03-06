import { fetchChatResponse } from '../ai/deepseek.js';
import { convertToAudioFile } from '../ai/gtts.js';
import { getPrompt } from './restaurant.js';
import { getPromptShopping } from './Shopping.js';
import { getPromptTrain } from './TrainStation.js';

const state = {
    lang: "",
    scen: "",
    prompt: null // Store the initialized prompt
};

export const setLanguage = (lang) => {
    state.lang = lang;
    console.log("Language set:", state.lang);
    checkAndInitializePrompt();
};

export const setScenario = (scen) => {
    state.scen = scen;
    console.log("Scenario set:", state.scen);
    checkAndInitializePrompt();
};

const checkAndInitializePrompt = async () => {
    if (state.lang && state.scen && state.prompt === null) {
        console.log("Both language and scenario are set. Initializing prompt...");
        state.prompt = await initializePrompt();
        
        if (state.prompt) {
            console.log("Fetching AI response...");
            const response = await fetchChatResponse([], state.prompt);
            if (response) {
                console.log("AI Response successfully received and processed.");
                if(state.lang==='French'){
                    convertToAudioFile('fr',response);
                }
                if(state.lang==='German'){
                    convertToAudioFile('de',response);
                }
                if(state.lang==='English'){
                    convertToAudioFile('es',response);
                }
            } else {
                console.error("Failed to get AI response.");
            }
        }
    }
};

const initializePrompt = async () => {
    try {
        if (!state.lang || !state.scen) {
            console.error("Error: Both language and scenario must be set before initializing.");
            return null;
        }

        console.log("Language:", state.lang);
        console.log("Scenario:", state.scen);

        const scenario = state.scen.toLowerCase();
        let prompt = "";

        switch (scenario) {
            case "restaurant":
                prompt = getPrompt(state.lang, state.scen, 'START');
                break;
            case "shopping":
                prompt = getPromptShopping(state.lang, state.scen, 'START');
                break;
            case "trainstation":
                prompt = getPromptTrain(state.lang, state.scen, 'START');
                break;
            default:
                console.error("Invalid scenario selected.");
                return "Error: Invalid scenario selected.";
        }

        console.log("Generated Prompt:", prompt);
        return prompt;
    } catch (error) {
        console.error("Error initializing prompt:", error);
        return "Error: Unable to initialize prompt.";
    }
};

// Add a function to expose the current AI response
export const getCurrentResponse = () => {
    // This could be enhanced to store and return the last response
    return state.lastResponse;
};