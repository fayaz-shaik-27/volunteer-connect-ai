const axios = require('axios');

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

// Mock credentials for demonstration
const CREDENTIALS = {
    admin: { code: 'ADMIN123', role: 'Administrator', access: 'System-wide control' },
    member: { code: 'MEMBER456', role: 'Volunteer Member', access: 'Standard member portal' }
};

/**
 * Handle incoming chat messages
 */
exports.handleChat = async (req, res) => {
    const { message, history, userRole } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Role detection / Login logic
    const lowerMessage = message.toLowerCase().trim();
    if (lowerMessage.startsWith('login admin ')) {
        const code = message.split(' ')[2];
        if (code === CREDENTIALS.admin.code) {
            return res.json({ 
                response: "Login successful! Welcome, Admin. You now have access to system insights. How can I assist you today?",
                role: 'admin'
            });
        }
        return res.json({ response: "Invalid admin code. Access denied." });
    }

    if (lowerMessage.startsWith('login member ')) {
        const code = message.split(' ')[2];
        if (code === CREDENTIALS.member.code) {
            return res.json({ 
                response: "Login successful! Welcome back, Member. Ready to find some volunteer opportunities?",
                role: 'member'
            });
        }
        return res.json({ response: "Invalid member code. Access denied." });
    }

    // Standard AI Response logic
    try {
        let systemPrompt = "You are 'Volunteer Connect AI Assistant', a helpful, enthusiastic, and conversational AI guide. ";
        systemPrompt += "The platform helps volunteers find roles in NGOs using skill-based matching. ";
        
        if (userRole === 'admin') {
            systemPrompt += "You are talking to an Administrator. You can discuss system metrics, user growth, and NGO success stories. ";
        } else if (userRole === 'member') {
            systemPrompt += "You are talking to a Volunteer Member. Be encouraging and provide tips on how to improve their skills or find the best opportunities. ";
        } else {
            systemPrompt += "You are talking to a Guest. Encourage them to 'Join as Volunteer' or 'Browse Opportunities'. ";
        }

        systemPrompt += "Keep responses concise (under 3 sentences), friendly, and interactive. Avoid repetitive greetings.";

        // Format history for Blenderbot
        // Blenderbot works better with a single string of context or specific format
        const historyText = history ? history.slice(-3).map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join(" | ") : "";
        
        const fullInput = `${systemPrompt} | History: ${historyText} | User: ${message}`;

        const response = await axios.post(
            MODEL_URL,
            {
                inputs: fullInput,
                parameters: {
                    max_length: 100,
                    temperature: 0.7, // Add variety
                    top_p: 0.9,
                    do_sample: true
                }
            },
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                timeout: 10000
            }
        );

        let botResponse = response.data.generated_text || response.data[0]?.generated_text || "I'm here to help! Whether you want to browse for a UI role or post a new opportunity, I've got you covered.";
        
        // Clean up common AI response artifacts
        botResponse = botResponse.split("Assistant:").pop().split("User:").shift().trim();
        botResponse = botResponse.replace(/[\[\]]/g, '').trim();

        res.json({ response: botResponse });


    } catch (error) {
        console.error("Chatbot AI Error:", error.message);
        res.json({ 
            response: "Hello! I'm the Volunteer Connect Assistant. I'm currently in a simplified mode, but I can help you find where to 'Volunteer Now' or 'Browse Opportunities' on our platform!"
        });
    }
};
