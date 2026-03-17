# Volunteer Connect AI - Interactive Manual

## 1. Setup
The project is split into `client` and `server`. 

### Backend (Server)
1. `cd server`
2. `npm install`
3. Add your `HF_TOKEN` to `.env` (Optional)
4. `node server.js`

### Frontend (Client)
1. `cd client`
2. `npm install`
3. `npm run dev`

## 2. New Features
### 🗺️ Interactive Maps
On the **Opportunities** page, click on any **Location** (e.g., "New York") on an opportunity card. An interactive Leaflet map will slide down!

### 🧠 Advanced AI
The "Find AI Matches" button now uses **Hugging Face Transformers**.
- It understands context. 
- A volunteer with "Frontend" skills will match an opportunity for "Web Design" automatically.
- No more "exact word only" matching.

## 3. Demo Mode
You don't need MongoDB! The app uses a global shared store in `server/config/tempStore.js`.
- Create an opportunity in the "Post Opportunity" tab.
- Register a volunteer in the "Join" tab.
- Go to "Opportunities" and watch the AI match them instantly.

Enjoy!
