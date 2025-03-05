import express from 'express';
import { fetchChatResponse } from './ai/deepseek.js'
import { convertToAudioFile } from './ai/gtts.js';
import { convertToText } from './ai/audiototext.js';
import router from './routes/routes.js';


const app=express();

const PORT=process.env.PORT||5001;


app.use('/auth/',router);



app.listen(PORT,()=>{
    console.log("Server is running in port 5001.");
})