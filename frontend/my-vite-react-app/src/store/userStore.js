import {create} from "zustand";
import { axiosInstance } from "../lib/axios";


export const userStore=create((set,get)=>({
    selectedLang:null,
    selectedScen:null,
    setSelectedLang:async(lang)=>{
        try {
            console.log("Sending language:", lang);  
            const response = await axiosInstance.post('/auth/language', { lang });
            console.log("Server response:", response.data); 
            set({selectedLanguage:lang});
        } catch (error) {
            console.log(error.message);
        }
    },
    setSelectedScen:async(scen)=>{
        try {
            const response=await axiosInstance.post('/auth/scenario',{scen});
            set({selectedScenario:scen});
        } catch (error) {
            console.log(error.message);
        }
    }
}))