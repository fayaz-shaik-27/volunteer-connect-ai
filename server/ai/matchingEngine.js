const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

/**
 * Basic Keyword Matching Logic (Helper)
 */
const performKeywordMatch = (opportunity, volunteers) => {
    const requiredSkills = opportunity.requiredSkills.map(s => s.toLowerCase().trim());
    
    return volunteers.map(volunteer => {
        const volunteerSkills = volunteer.skills.map(s => s.toLowerCase().trim());
        const matchingSkills = volunteerSkills.filter(skill => requiredSkills.includes(skill));
        
        let score = 0;
        if (requiredSkills.length > 0) {
            score = (matchingSkills.length / requiredSkills.length) * 100;
        }

        return {
            volunteerId: volunteer._id,
            name: volunteer.name,
            email: volunteer.email,
            location: volunteer.location,
            matchingSkills,
            score: Math.round(score),
            explanation: `Keyword Match: ${matchingSkills.length}/${requiredSkills.length} skills.`
        };
    }).sort((a, b) => b.score - a.score);
};

/**
 * AI Matching Engine for Volunteer Connect
 * Logic: Calculates a compatibility score based on semantic similarity using Hugging Face.
 */
exports.matchVolunteers = async (opportunity, volunteers) => {
    // If no HF_TOKEN or default value, use keyword matching
    if (!HF_TOKEN || HF_TOKEN === 'your_hugging_face_token_here') {
        return performKeywordMatch(opportunity, volunteers);
    }

    try {
        const requiredSkillsStr = opportunity.requiredSkills.join(", ").toLowerCase();
        const sentences = volunteers.map(v => v.skills.join(", ").toLowerCase());
        
        const response = await axios.post(
            MODEL_URL,
            {
                inputs: {
                    source_sentence: requiredSkillsStr,
                    sentences: sentences
                },
                options: { wait_for_model: true } // Handle cold starts
            },
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                timeout: 10000 // 10 second timeout
            }
        );

        const scores = response.data;

        // Verify we got an array of scores
        if (!Array.isArray(scores)) {
            throw new Error("Invalid response from AI API");
        }

        return volunteers.map((volunteer, index) => {
            const score = Math.round((scores[index] || 0) * 100);
            
            // Still find exact matches for visual feedback
            const requiredSkills = opportunity.requiredSkills.map(s => s.toLowerCase().trim());
            const volunteerSkills = volunteer.skills.map(s => s.toLowerCase().trim());
            const matchingSkills = volunteerSkills.filter(skill => requiredSkills.includes(skill));

            return {
                volunteerId: volunteer._id,
                name: volunteer.name,
                email: volunteer.email,
                location: volunteer.location,
                matchingSkills,
                score: score,
                explanation: score > 70 ? "High semantic correlation with required skills." : 
                             score > 40 ? "Moderate skill set alignment." : "Low skill match."
            };
        }).sort((a, b) => b.score - a.score);

    } catch (error) {
        console.error("Hugging Face API Error Fallback:", error.message);
        return performKeywordMatch(opportunity, volunteers);
    }
};
