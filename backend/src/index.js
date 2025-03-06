import express from 'express';
import { fetchChatResponse } from './ai/deepseek.js'
import { convertToAudioFile } from './ai/gtts.js';
import { convertToText } from './ai/audiototext.js';
import router from './routes/routes.js';
import session from 'express-session';


const app=express();

app.use(session({
    secret: "yourSecretKey", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const PORT=process.env.PORT||5001;
app.use(express.json());
app.use('/auth',router);



app.listen(PORT,()=>{
    console.log("Server is running in port 5001.");
})