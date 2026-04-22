const Log = require("../models/Logs");

exports.getChatResponse = async (req, res) => {
    try {
        const { message, userId } = req.body;
        const msg = message.toLowerCase();
        
        // 1. Fetch Latest Data
        const latestLog = await Log.findOne({ userId }).sort({ date: -1 });

        // 2. Initial Setup: Calculate User Health Profile
        let userProfile = { bmi: 0, status: "Unknown", dataReady: false };
        if (latestLog && latestLog.height > 0) {
            userProfile.bmi = (latestLog.weight / ((latestLog.height / 100) ** 2)).toFixed(1);
            userProfile.status = userProfile.bmi < 18.5 ? "Underweight" : userProfile.bmi > 25 ? "Overweight" : "Healthy";
            userProfile.dataReady = true;
        }

        let response = "";

        // --- LOGIC A: PROJECT EXPLANATION & ELEMENTS ---
        if (msg.includes("project") || msg.includes("what is this") || msg.includes("function")) {
            response = "This is a Digital Health Twin AI. It creates a virtual version of you based on your habits. It functions by analyzing your Sleep, Diet, and BMI to predict your future health trajectory.";
        } 
        else if (msg.includes("wellness index") || msg.includes("score")) {
            response = "The Wellness Index is your health grade (0-100). It's calculated by taking your good habits (sleep, exercise) and subtracting penalties like stress and excessive screen time.";
        }
        else if (msg.includes("xp") || msg.includes("level") || msg.includes("evolution")) {
            response = "The Evolution system (XP) tracks your consistency. Every time you sync your data, your Twin evolves. Higher levels mean you are maintaining a better 'Health-Sync' over time.";
        }
        else if (msg.includes("sidebar") || msg.includes("input")) {
            response = "The Sidebar is your 'Control Panel'. You enter your daily habits there to update your Digital Twin in real-time.";
        }

        // --- LOGIC B: DIET & NUTRITION (CONTEXT AWARE) ---
        else if (msg.includes("diet") || msg.includes("eat") || msg.includes("food")) {
            if (!userProfile.dataReady) {
                response = "I can't give a safe diet plan without your height and weight. Please update your Twin in the sidebar first!";
            } else if (userProfile.status === "Overweight") {
                response = `Since your BMI is ${userProfile.bmi} (Overweight), I recommend a 'Caloric Deficit' diet. Focus on high protein (chicken, beans) and fiber, and avoid sugary drinks. You need to burn more than you eat.`;
            } else if (userProfile.status === "Underweight") {
                response = `Warning: Your BMI is ${userProfile.bmi} (Underweight). I strongly advise AGAINST dieting to lose weight. Instead, focus on a 'Caloric Surplus'—eat more healthy fats, nuts, and proteins to build muscle and strength.`;
            } else {
                response = "Your BMI is in the healthy range! A balanced diet with 50% carbs, 30% protein, and 20% fats is best for you to maintain this perfect balance.";
            }
        }

        // --- LOGIC C: GENERAL HEALTH & BMI ---
        else if (msg.includes("bmi") || msg.includes("height") || msg.includes("weight")) {
            response = userProfile.dataReady 
                ? `Your current BMI is ${userProfile.bmi}. In this project, BMI is a key element that affects your overall Wellness Index score.`
                : "I don't have your measurements. Enter your height and weight in the sidebar to see your BMI analysis.";
        }
        else if (msg.includes("screen time")) {
            response = "High screen time causes eye strain and ruins sleep. My AI logic penalizes your Wellness Score if you exceed 6 hours of digital use per day.";
        }

        // --- LOGIC D: FALLBACK (GENERAL QUESTIONS) ---
        else {
            response = "That's an interesting question! As your Health Twin AI, I can tell you about your diet plans, explain how the Wellness Index works, or help you understand your BMI. What would you like to know?";
        }

        res.json({ reply: response });

    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "My system is recalculating. Please try again!" });
    }
};