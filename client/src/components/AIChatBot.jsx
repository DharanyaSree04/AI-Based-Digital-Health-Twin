import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

const AIChatBot = ({ userId, isOpen, setIsOpen }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hello! I am your Health Twin AI. Ask me about your BMI, Sleep, or Stress levels!", isBot: true }
    ]);
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        try {
            // CALLING THE BACKEND CHAT API
            const res = await axios.post('http://localhost:5000/api/chat', { 
                message: currentInput, 
                userId 
            });
            
            setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);
        } catch (err) {
            setMessages(prev => [...prev, { 
                text: "My neural links are offline. Is the server running?", 
                isBot: true 
            }]);
        }
    };

    return (
        <div className="chatbot-wrapper">
            {/* FLOATING TOGGLE BUTTON (Visible when closed) */}
            {!isOpen ? (
                <button className="chat-toggle" onClick={() => setIsOpen(true)}>
                    <MessageSquare size={24} />
                </button>
            ) : (
                /* CHAT WINDOW (Visible when open) */
                <div className="chat-window widget">
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Bot size={20} color="var(--primary)" /> 
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Health AI</span>
                        </div>
                        <X 
                            size={20} 
                            onClick={() => setIsOpen(false)} 
                            style={{ cursor: 'pointer', opacity: 0.6 }} 
                        />
                    </div>

                    <div className="chat-body">
                        {messages.map((m, i) => (
                            <div key={i} className={`msg ${m.isBot ? 'bot' : 'user'}`}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '10px', opacity: 0.5, marginBottom: '2px' }}>
                                        {m.isBot ? 'Health AI' : 'You'}
                                    </span>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-footer" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            placeholder="Type a message..." 
                            autoFocus
                        />
                        <button type="submit" disabled={!input.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatBot;