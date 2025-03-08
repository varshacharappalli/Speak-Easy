import gTTS from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, 'airesponse');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

export const convertToAudioFile = (lang, message) => {
    try {
        const timestamp = Date.now();
        const filePath = path.join(folderPath, `output_${timestamp}.mp3`);
        
        const gtts = new gTTS(message, lang);
        gtts.save(filePath, (err) => {
            if (err) {
                console.error('Error saving file:', err.message);
            } else {
                console.log(`Audio file saved: ${filePath}`);
            }
        });
        return filePath;
    } catch (error) {
        console.error('Error:', error.message);
    }
};
