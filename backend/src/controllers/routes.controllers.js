import { setLanguage, setScenario } from "../scenarios/Choose.js";
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

export const scenario = (req, res) => {
    const { scen } = req.body;
    if (!scen) {
        return res.status(400).json({ message: 'Scenario has not been specified.' });
    }
    
    setScenario(scen);
    
    res.status(200).json({
        message: 'Scenario received successfully.',
        scenario: scen
    });
};

export const conversation = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded." });
    }

    const audioBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const filePath = path.join("uploads", fileName);

    fs.writeFile(filePath, audioBuffer, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving audio file." });
        }
        res.status(200).json({ message: "Audio file saved successfully.", fileName });
    });
    convertToText(filePath);
};
