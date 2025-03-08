import { getAudioFile, setLanguage, setScenario, setText } from "../scenarios/Choose.js"; 
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
        
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads", { recursive: true });
        }
        
        fs.writeFileSync(filePath, audioBuffer);
        
        const text = await convertToText(filePath);
        
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

export const airesponse = async (req, res) => {
    try {
        // Get the audio file path
        const audioFile = getAudioFile();
        
        if (!audioFile) {
            console.log("Audio file not found");
            return res.status(404).json({ message: 'AI audio file not found' });
        }
        
        console.log(`Sending AI audio file: ${audioFile}`);
        
        // Check if file exists
        if (!fs.existsSync(audioFile)) {
            console.error(`File does not exist at path: ${audioFile}`);
            return res.status(404).json({ message: 'AI audio file does not exist on server' });
        }
        
        // Set appropriate headers for audio content
        res.setHeader('Content-Type', 'audio/mpeg');
        
        // For debugging, log the file size
        const stats = fs.statSync(audioFile);
        console.log(`Audio file size: ${stats.size} bytes`);
        
        // Send the file with absolute path
        const absolutePath = path.resolve(audioFile);
        console.log(`Sending absolute path: ${absolutePath}`);
        
        // Use fs.createReadStream for better handling of large files
        const fileStream = fs.createReadStream(absolutePath);
        fileStream.pipe(res);
        
        // Handle errors in the stream
        fileStream.on('error', (err) => {
            console.error("Error streaming file:", err);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error streaming audio file', error: err.message });
            }
        });
    } catch (error) {
        console.error("Error in AI response handler:", error);
        res.status(500).json({ message: 'Error retrieving AI response', error: error.message });
    }
};