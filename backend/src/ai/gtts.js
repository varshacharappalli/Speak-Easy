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
    return new Promise((resolve, reject) => {
        try {
            const timestamp = Date.now();
            const filePath = path.join(folderPath, `output_${timestamp}.mp3`);
            
            const gtts = new gTTS(message, lang);
            gtts.save(filePath, (err) => {
                if (err) {
                    console.error('Error saving file:', err.message);
                    reject(err);
                } else {
                    console.log(`Audio file saved: ${filePath}`);
                    
                    // Verify the file has content
                    fs.stat(filePath, (statErr, stats) => {
                        if (statErr) {
                            console.error('Error checking file:', statErr.message);
                            reject(statErr);
                        } else if (stats.size === 0) {
                            const error = new Error('Generated audio file is empty');
                            console.error(error.message);
                            reject(error);
                        } else {
                            console.log(`Audio file size: ${stats.size} bytes`);
                            resolve(filePath);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error:', error.message);
            reject(error);
        }
    });
};
