import React from 'react';
import { AlertCircle, CheckCircle, TrendingDown, Info, Zap } from 'lucide-react';

const AIInsights = ({ latestLog }) => {
    if (!latestLog) return null;

    const { wellnessScore, sleep, exercise, screenTime, stress, weight, height } = latestLog;
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    const generateSimpleAdvice = () => {
        let report = {
            mainMessage: "",
            warnings: [],
            bmiTalk: "",
            tips: []
        };

        // 1. General Wellness Message
        if (wellnessScore >= 80) {
            report.mainMessage = "Excellent! Your health twin is in great shape. Keep doing what you are doing to stay energetic and strong!";
        } else if (wellnessScore >= 50) {
            report.mainMessage = "Not bad, but you can do better. A few small changes will help you feel much more active.";
        } else {
            report.mainMessage = "Warning: Your health twin is struggling. You need to change some habits soon to avoid feeling sick or weak.";
        }

        // 2. Simple Habit Logic & Future Problems
        if (screenTime > 8) {
            report.warnings.push("You are spending too much time on screens. This will cause eye pain and headaches. In the future, it can make your eyesight weak and ruin your sleep.");
            report.tips.push("Try the 20-20-20 rule: Every 20 minutes, look at something far away for 20 seconds.");
        }
        if (sleep < 7) {
            report.warnings.push("You aren't sleeping enough. This makes your brain slow and your body weak. If you continue, you might face heart problems and memory loss later.");
            report.tips.push("Try to go to bed at the same time every night, even on weekends.");
        }
        if (stress > 7) {
            report.warnings.push("Your stress is too high. This is bad for your heart and blood pressure. Long-term stress can lead to constant chest pain and anxiety.");
            report.tips.push("Take 5 minutes to just breathe deeply when you feel overwhelmed.");
        }
        if (exercise < 30) {
            report.warnings.push("You aren't moving enough. This makes your muscles and heart weak. Later in life, this can cause joint pain and make it hard to move around.");
            report.tips.push("Even a 15-minute fast walk every day can make a huge difference.");
        }

        // 3. Simple BMI Advice
        if (bmi > 25) {
            report.bmiTalk = `Your weight (${weight}kg) is a bit high for your height. This puts a lot of pressure on your knees and heart. Try to eat less sugary snacks and move more to bring this number down.`;
        } else if (bmi < 18.5) {
            report.bmiTalk = `You are a bit too thin for your height. This can make you feel tired and weak easily. Try to eat more healthy meals with protein to build some strength.`;
        } else {
            report.bmiTalk = `Your weight is perfect for your height! This is great because it helps your heart and lungs work without extra effort.`;
        }

        return report;
    };

    const advice = generateSimpleAdvice();

    return (
        <div className="widget ai-insight-card">
            <div className="insight-header">
                <Zap size={20} color="var(--primary)" fill="var(--primary)" />
                <h3 style={{margin:0}}>HEALTH TWIN REPORT</h3>
            </div>

            <p className="main-msg">{advice.mainMessage}</p>

            <div className="insight-grid">
                {/* BMI Section */}
                <div className="info-box bmi">
                    <Info size={18} />
                    <div>
                        <strong>Weight & Height Check</strong>
                        <p>{advice.bmiTalk}</p>
                    </div>
                </div>

                {/* Problems & Future Section */}
                {advice.warnings.length > 0 && (
                    <div className="info-box warning">
                        <AlertCircle size={18} />
                        <div>
                            <strong>Future Problems to Avoid:</strong>
                            <ul>
                                {advice.warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Improvement Tips */}
            {advice.tips.length > 0 && (
                <div className="tips-section">
                    <strong>How to improve your health:</strong>
                    <div className="tips-list">
                        {advice.tips.map((t, i) => <span key={i} className="tip-tag">{t}</span>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIInsights;