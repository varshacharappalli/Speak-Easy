
import { fetchChatResponse } from '../ai/deepseek.js'; 
import { convertToAudioFile } from '../ai/gtts.js'; 
import { getPrompt } from './restaurant.js'; 
import { getPromptShopping } from './Shopping.js'; 
import { getPromptTrain } from './TrainStation.js';

export const state = {
    lang: "",
    scen: "",
    prompt: null,
    lastResponse: "",
    lastAudioFile: null,
    conversationStarted: false
};

const user_input = {
    text: ""
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

export const setText = async (text) => {
    user_input.text = text;
    console.log("Transcription text set to:", user_input.text);
    
    if (state.conversationStarted) {
        await continueConversation();
    }
};

const checkAndInitializePrompt = async () => {
    if (!state.lang || !state.scen) {
        console.log("Waiting for both language and scenario to be set.");
        return;
    }
    
    if (!state.conversationStarted) {
        console.log("Starting new conversation...");
        await startConversation();
    }
};

const startConversation = async () => {
    state.conversationStarted = true;
    state.prompt = await initializePrompt("START");
    
    if (state.prompt) {
        console.log("Fetching initial AI response...");
        const response = await fetchChatResponse([], state.prompt);
        
        if (response) {
            console.log("Initial AI Response successfully received.");
            state.lastResponse = response;
            
            const langMap = { "French": "fr", "German": "de", "English": "en", "Spanish": "es" };
            if (langMap[state.lang]) {
                state.lastAudioFile=await convertToAudioFile(langMap[state.lang], response);
            }
        } else {
            console.error("Failed to get initial AI response.");
        }
    }
};

const continueConversation = async () => {
    state.prompt = await initializePrompt("CONTINUE");
    
    if (state.prompt) {
        console.log("Fetching AI response based on user input...");
        const response = await fetchChatResponse([], state.prompt);
        
        if (response) {
            console.log("AI Response successfully received.");
            state.lastResponse = response;
            
            const langMap = { "French": "fr", "German": "de", "English": "en", "Spanish": "es" };
            if (langMap[state.lang]) {
                state.lastAudioFile = await convertToAudioFile(langMap[state.lang], response);
            }
        } else {
            console.error("Failed to get AI response.");
        }
    }
};

const initializePrompt = async (conversationState) => {
    try {
        if (!state.lang || !state.scen) {
            console.error("Error: Both language and scenario must be set before initializing.");
            return null;
        }
        
        console.log("Language:", state.lang);
        console.log("Scenario:", state.scen);
        console.log("Conversation State:", conversationState);
        
        let prompt = "";
        const scenario = state.scen.toLowerCase();
        
        switch (scenario) {
            case "restaurant":
                prompt = getPrompt(state.lang, state.scen, conversationState, user_input.text);
                break;
            case "shopping":
                prompt = getPromptShopping(state.lang, state.scen, conversationState, user_input.text);
                break;
            case "trainstation":
                prompt = getPromptTrain(state.lang, state.scen, conversationState, user_input.text);
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

export const getCurrentResponse = () => {
    return state.lastResponse;
};

export const getAudioFile=()=>{
    return state.lastAudioFile;
}