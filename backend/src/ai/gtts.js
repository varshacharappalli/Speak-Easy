import gTTS from 'gtts';
import fs from 'fs';



export const convertToAudioFile=(lang,message)=>{
    const filePath='output.mp3';
    try {
        const gtts = new gTTS(message, lang);
        gtts.save(filePath);
    } catch (error) {
        console.log(error.message);
    }
}
