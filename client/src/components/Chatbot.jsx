import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minus, Bot, ShieldCheck, UserCheck, GripVertical, Sparkles } from 'lucide-react';
import { sendMessage } from '../services/chatService';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi! I'm your Volunteer Connect AI. How can I spark your passion today? ✨" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const messagesEndRef = useRef(null);

    const suggestChips = [
        "How to volunteer?",
        "Tell me about NGOs",
        "Skill matching help",
        "Admin Portal info"
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (msgText) => {
        const textToSearch = typeof msgText === 'string' ? msgText : input;
        if (!textToSearch.trim() || isLoading) return;

        const userMessage = { role: 'user', content: textToSearch };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const response = await sendMessage(textToSearch, messages, userRole);
        
        if (response.role) {
            setUserRole(response.role);
        }

        setMessages(prev => [...prev, { role: 'bot', content: response.response }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed z-50 pointer-events-none" style={{ inset: 0 }}>
            {/* The actual draggable widget */}
            <motion.div 
                drag
                dragMomentum={false}
                className="pointer-events-auto absolute bottom-6 right-6"
                initial={{ x: 0, y: 0 }}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center text-white"
                            style={{ 
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                                boxShadow: '0 8px 32px rgba(22, 163, 74, 0.4)'
                            }}
                        >
                            <Sparkles size={28} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 transition-all ${
                                isMinimized ? 'h-14 w-60' : 'h-[520px] w-80 md:w-[360px]'
                            }`}
                        >
                            {/* Header / Drag Handle */}
                            <div className="p-3 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between cursor-move"
                                 style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}>
                                <div className="flex items-center gap-2">
                                    <GripVertical size={16} className="opacity-50" />
                                    <Sparkles size={18} />
                                    <span className="font-bold text-sm tracking-tight">AI MATCH ASSISTANT</span>
                                    {userRole === 'admin' && <ShieldCheck size={14} className="text-yellow-300" />}
                                    {userRole === 'member' && <UserCheck size={14} className="text-blue-200" />}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded-lg">
                                        <Minus size={16} />
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {!isMinimized && (
                                <>
                                    {/* Messages area */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-scroll bg-gray-50/30">
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                                                    msg.role === 'user' 
                                                    ? 'bg-primary text-white shadow-lg rounded-tr-none' 
                                                    : 'bg-white text-gray-800 shadow-md border border-gray-100 rounded-tl-none'
                                                }`}
                                                style={msg.role === 'user' ? { background: 'var(--primary)' } : {}}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex gap-1">
                                                    {[0,1,2].map(d => <div key={d} className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: `${d*0.2}s` }} />)}
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Interaction chips */}
                                    <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                                        {suggestChips.map(chip => (
                                            <button 
                                                key={chip}
                                                onClick={() => handleSend(chip)}
                                                className="whitespace-nowrap px-3 py-1 bg-white border border-primary/20 text-xs rounded-full text-primary font-medium hover:bg-primary/10 transition-colors shadow-sm"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input field */}
                                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-white/50 border-t border-gray-100 flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask anything..."
                                            className="flex-1 px-4 py-2 bg-white rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                                        />
                                        <button 
                                            type="submit"
                                            className="p-2.5 rounded-xl text-white shadow-lg hover:brightness-110 active:scale-95 transition-all"
                                            style={{ background: 'var(--primary)' }}
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Chatbot;
