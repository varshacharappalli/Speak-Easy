import { setLanguage, setScenario, setText } from "../scenarios/Choose.js"; 
import fs from "fs"; 
import path from "path"; 
import { convertToText } from "../ai/audiototext.js";

export const language = (req, res) => {
    const { lang } = req.body;
    if (!lang) {
        return res.status(400).json({ message: 'Language is not entered.' });
    }
    
    setLanguage(lang);
    
    res.status(200).json({ message: 'Language received successfully.' });
};

export const scenario = async (req, res) => {
    const { scen } = req.body;
    if (!scen) {
        return res.status(400).json({ message: 'Scenario has not been specified.' });
    }
    
    await setScenario(scen);
    
    res.status(200).json({
        message: 'Scenario received successfully.',
        scenario: scen
    });
};

export const conversation = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded." });
    }
    
    try {
        const audioBuffer = req.file.buffer;
        const fileName = `${Date.now()}_${req.file.originalname}`;
        const filePath = path.join("uploads", fileName);
        
        // Ensure the uploads directory exists
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads", { recursive: true });
        }
        
        // Write file synchronously to ensure it's completed before processing
        fs.writeFileSync(filePath, audioBuffer);
        
        // Process the audio file to get text
        const text = await convertToText(filePath);
        
        // Send the text to the conversation manager
        await setText(text);
        
        res.status(200).json({ 
            message: "Audio file processed successfully.", 
            fileName,
            transcribedText: text
        });
    } catch (error) {
        console.error("Error processing audio:", error);
        res.status(500).json({ 
            message: "Error processing audio file.", 
            error: error.message 
        });
    }
};