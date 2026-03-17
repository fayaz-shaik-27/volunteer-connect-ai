// api.js — Centralised Axios service layer
// All API calls go through this file so the base URL is easy to change.
import axios from 'axios';

// Backend base URL — update this if deploying to production
const API_URL = 'http://localhost:5000/api';

// ── Volunteer endpoints ──────────────────────────────────
/** Register a new volunteer */
export const registerVolunteer = (data) =>
  axios.post(`${API_URL}/volunteers`, data);

/** Fetch all registered volunteers */
export const getVolunteers = () =>
  axios.get(`${API_URL}/volunteers`);

// ── Opportunity endpoints ────────────────────────────────
/** Create a new volunteer opportunity */
export const createOpportunity = (data) =>
  axios.post(`${API_URL}/opportunities`, data);

/** Fetch all volunteer opportunities */
export const getOpportunities = () =>
  axios.get(`${API_URL}/opportunities`);

/**
 * Fetch AI-generated volunteer matches for a specific opportunity.
 * @param {string} id — MongoDB _id of the opportunity
 */
export const getOpportunityMatches = (id) =>
  axios.get(`${API_URL}/opportunities/${id}/matches`);
