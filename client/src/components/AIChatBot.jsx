import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, Send, X, Bot, Download } from 'lucide-react'; // Added Download icon
import { jsPDF } from "jspdf"; // Import jsPDF

const AIChatBot = ({ userId, isOpen, setIsOpen }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Gemini, your Health Twin AI. How can I help you today?", isBot: true }
    ]);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // --- PDF GENERATION FUNCTION ---
const downloadResponse = (text) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);
    
    // 1. Split text into lines that fit the page width
    const splitLines = doc.splitTextToSize(text, maxLineWidth);
    
    let cursorY = 45; // Starting vertical position
    const lineHeight = 7; // Space between lines
    let pageCount = 1;

    // Helper function to draw Header and Page Numbers
    const addDecorations = (pageNum) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 210, 255); // Theme Cyan
        doc.text("HEALTH TWIN AI - REPORT", margin, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, 28);
        
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 210, 255);
        doc.line(margin, 32, pageWidth - margin, 32);

        // Footer: Page Number
        doc.setFontSize(10);
        doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    // Initialize first page
    addDecorations(pageCount);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40);

    // 2. Loop through lines and handle page breaks
    splitLines.forEach((line) => {
        // If cursor exceeds page height (leaving room for footer), add a new page
        if (cursorY > pageHeight - 30) {
            doc.addPage();
            pageCount++;
            cursorY = 40; // Reset Y for the new page
            addDecorations(pageCount); // Draw header/footer on new page
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(40);
        }
        
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
    });

    // 3. Save the PDF
    doc.save(`HealthTwin_Report_P${pageCount}.pdf`);
};

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { 
                message: input, 
                userId 
            });
            setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);
        } catch (err) {
            setMessages(prev => [...prev, { text: "Error: Cannot connect to server.", isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper">
            {!isOpen ? (
                <button className="chat-toggle" onClick={() => setIsOpen(true)}>
                    <MessageSquare size={28} color="white" />
                </button>
            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <Bot size={20} color="#00d2ff"/> 
                            <span style={{fontWeight:'bold', color:'white'}}>Health Assistant</span>
                        </div>
                        <X size={20} onClick={() => setIsOpen(false)} style={{cursor:'pointer', color:'white'}} />
                    </div>

                    <div className="chat-body">
                        {messages.map((m, i) => (
                            <div key={i} className={`msg ${m.isBot ? 'bot' : 'user'}`}>
                                <div style={{position:'relative'}}>
                                    {m.text}
                                    
                                    {/* DOWNLOAD ICON: Only for Bot messages */}
                                    {m.isBot && (
                                        <button 
                                            onClick={() => downloadResponse(m.text)}
                                            style={{
                                                display:'block', 
                                                marginTop:'8px', 
                                                background:'none', 
                                                border:'none', 
                                                cursor:'pointer', 
                                                color:'#00d2ff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            <Download size={14} /> Download PDF
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="msg bot">AI is thinking...</div>}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-footer" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            placeholder="Type a message..." 
                        />
                        <button type="submit">
                            <Send size={18} color="black"/>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatBot;