# Deployment Guide: Volunteer Connect AI

This project is configured for **Universal Deployment**. Follow the steps below for your preferred platform.

## 1. Vercel (Recommended)
Fastest deployment with automatic frontend and backend (Serverless) support.

1. **Push to GitHub**: Ensure all changes are committed and pushed.
2. **Import Project**: Go to [vercel.com](https://vercel.com) and import this repository.
3. **Configure Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
4. **Environment Variables**: Add the following in the Vercel Dashboard:
   - `MONGO_URI`: Your MongoDB connection string.
   - `HF_TOKEN`: Your Hugging Face Inference API token.
   - `NODE_ENV`: `production`

## 2. Render / Railway (Standard Node.js)
Best for long-running processes or standard Express servers.

1. **Frontend**: Deploy the `client` folder as a **Static Site**.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Env Var: `VITE_API_URL` (Set to your Backend URL).
2. **Backend**: Deploy the `server` folder as a **Web Service**.
   - Start Command: `node server.js`
   - Env Vars: `MONGO_URI`, `HF_TOKEN`, `PORT`.

## 3. Local Production
1. `cd client && npm install && npm run build`
2. `cd ../server && npm install`
3. `node server.js`
