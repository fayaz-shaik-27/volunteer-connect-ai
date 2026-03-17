import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || '/api') + '/chat';

export const sendMessage = async (message, history, userRole) => {
    try {
        const response = await axios.post(API_URL, { message, history, userRole });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        return { response: "I'm having trouble connecting to the server. Please try again later." };
    }
};
