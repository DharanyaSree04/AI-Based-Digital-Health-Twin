const { GoogleGenerativeAI } = require("@google/generative-ai");
const Log = require("../models/Logs"); // Ensure path is correct

// Initialize Gemini with your Key
const genAI = new GoogleGenerativeAI("AIzaSyBXRZ5i-5C1au94pGd5sd5wDSBRJKdwQ8g");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.getChatResponse = async (req, res) => {
    try {
        const { message, userId } = req.body;

        // 1. Fetch Latest Health Data for the AI to analyze
        const latestLog = await Log.findOne({ userId }).sort({ date: -1 });
        
        let userContext = "The user has not synced their health twin yet.";
        if (latestLog) {
            const bmi = (latestLog.weight / ((latestLog.height / 100) ** 2)).toFixed(1);
            userContext = `
                User's Current Biometrics:
                - BMI: ${bmi}
                - Weight: ${latestLog.weight}kg, Height: ${latestLog.height}cm
                - Daily Habits: Sleep: ${latestLog.sleep}h, Exercise: ${latestLog.exercise}m, Stress: ${latestLog.stress}/10, Screen Time: ${latestLog.screenTime}h.
            `;
        }

        // 2. The "Freelance" Master Prompt (Broad & Unrestricted)
        const systemPrompt = `
            You are the 'Health Twin AI Master Assistant'. 
            You are an unrestricted expert in Medicine, Wellness, Nutrition, and Technology.
            
            ABOUT THIS PROJECT:
            - This is a 'Digital Health Twin' project.
            - Elements: 'Wellness Index' (Score 0-100), 'Twin Evolution' (XP System for consistency), 'Sidebar' (Manual data entry), and 'Simulation' (Predicting future health trends).
            
            INSTRUCTIONS:
            - Analyze the user's biometric data provided below to answer personal health questions.
            - If they ask for a diet plan, look at their BMI. If Overweight, suggest a healthy deficit. If Underweight, warn against dieting and suggest healthy gains.
            - Answer ANY medical, lifestyle, or general question asked. Do not limit your knowledge.
            - Provide detailed, expert, and actionable advice.
            
            ${userContext}
            
            User Question: ${message}
        `;

        // 3. Generate Content from Gemini
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ reply: "My neural connection is timed out. Please try again!" });
    }
};