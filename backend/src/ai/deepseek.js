import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: "./src/.env" });


export const fetchChatResponse=async(messages,prompt)=>{
    try {
        if(!prompt){
            console.log("No prompt was entered!");
        }
        else{
            messages.push({ role: 'user', content: prompt })
        }
        const response=await fetch("https://openrouter.ai/api/v1/chat/completions",{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                'model':"deepseek/deepseek-r1:free",
                "messages": messages
            })

        })
        const data=await response.json()
        if (data.choices && data.choices.length > 0) {
            const botResponse = data.choices[0].message.content;
            console.log("AI Response:", botResponse);
            return botResponse; 
        } else {
            console.log("No response from AI.");
            return null;
        }
    } catch (error) {
        console.log(error.message);
    }
}


  