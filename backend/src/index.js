import express from 'express';
import cors from 'cors';
import { fetchChatResponse } from './ai/deepseek.js';
import { convertToAudioFile } from './ai/gtts.js';
import { convertToText } from './ai/audiototext.js';
import router from './routes/routes.js';
import session from 'express-session';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

console.log("API key loaded:", process.env.API_KEY ? "Yes (length: " + process.env.API_KEY.length + ")" : "No");

const PORT = process.env.PORT || 5001;
app.use(express.json());



app.use('/auth', router);

app.listen(PORT, () => {
    console.log("Server is running on port 5001.");
});