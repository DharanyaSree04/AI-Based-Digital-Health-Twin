import React, { useState } from 'react';
import axios from 'axios';
import { Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = ({ onAuth }) => {
    // State to toggle between Login and Register views
    const [isLogin, setIsLogin] = useState(true);
    
    // State for form inputs
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '' 
    });

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const res = await axios.post(`http://localhost:5000${url}`, form);
            
            if (isLogin) {
                // If login successful, pass user data to App.jsx
                onAuth(res.data.user);
            } else {
                // If registration successful, switch to login view
                alert("Account created successfully! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.msg || "Authentication failed. Please try again.");
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-card widget">
                {/* Futuristic Icon */}
                <div className="auth-icon-circle">
                    <Zap size={32} color="var(--primary)" fill="var(--primary)" />
                </div>

                <h2 className="auth-title">
                    {isLogin ? "Digital Twin Login" : "Initialize New Twin"}
                </h2>
                <p className="auth-subtitle">
                    {isLogin 
                        ? "Sync your habits with your virtual self" 
                        : "Start your predictive health journey today"}
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Register specific field: Name */}
                    {!isLogin && (
                        <div className="input-container">
                            <User className="input-icon" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                onChange={e => setForm({...form, name: e.target.value})} 
                                required 
                            />
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="input-container">
                        <Mail className="input-icon" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            onChange={e => setForm({...form, email: e.target.value})} 
                            required 
                        />
                    </div>

                    {/* Password Field */}
                    <div className="input-container">
                        <Lock className="input-icon" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={e => setForm({...form, password: e.target.value})} 
                            required 
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="sync-btn auth-btn">
                        {isLogin ? "Login to Twin" : "Create Account"} 
                        <ArrowRight size={18} style={{marginLeft: '10px'}} />
                    </button>
                </form>

                {/* View Toggle Link */}
                <p className="auth-toggle-text" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin 
                        ? "New here? Create a health account" 
                        : "Already registered? Login here"}
                </p>
            </div>
        </div>
    );
};

export default Auth;