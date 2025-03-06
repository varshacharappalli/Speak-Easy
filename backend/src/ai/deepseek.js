import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: "./src/.env" });


export const fetchChatResponse = async (messages = [],prompt) => {  
    try {
        
        if (!prompt || prompt.startsWith("Error")) {  
            console.log("Waiting for language and scenario to be set...");
            return null;
        }

        const newMessages = [...messages, { role: 'user', content: prompt }];

        console.log("Sending request to AI service...");

        const apiKey = process.env.API_KEY?.trim();
        if (!apiKey) {
            console.error("Error: Missing API key.");
            return null;
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1:free",
                messages: newMessages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API request failed:", response.status, errorData);
            return null;
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            const botResponse = data.choices[0].message.content;
            console.log("AI Response:", botResponse);
            return botResponse;
        } else {
            console.log("No response from AI.");
            return null;
        }

    } catch (error) {
        console.error("Error fetching chat response:", error);
        return null;
    }
};
