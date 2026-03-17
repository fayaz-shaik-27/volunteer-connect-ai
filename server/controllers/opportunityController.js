const Opportunity = require('../models/Opportunity');
const matchingEngine = require('../ai/matchingEngine');
const Volunteer = require('../models/Volunteer');
const mongoose = require('mongoose');
const tempStore = require('../config/tempStore');

// @desc    Create an opportunity
// @route   POST /api/opportunities
exports.createOpportunity = async (req, res) => {
    try {
        const { title, organizationName, description, location, date, requiredSkills, volunteersNeeded } = req.body;
        
        if (mongoose.connection.readyState !== 1) {
            console.log('Using Demo Mode: Creating opportunity in-memory');
            const newOpportunity = { 
                _id: Date.now().toString(), 
                title, 
                organizationName, 
                description, 
                location, 
                date, 
                requiredSkills, 
                volunteersNeeded 
            };
            tempStore.opportunities.push(newOpportunity);
            return res.status(201).json(newOpportunity);
        }

        const opportunity = await Opportunity.create({
            title, organizationName, description, location, date, requiredSkills, volunteersNeeded
        });

        res.status(201).json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all opportunities
// @route   GET /api/opportunities
exports.getOpportunities = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(tempStore.opportunities);
        }
        const opportunities = await Opportunity.find({});
        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get AI matches for an opportunity
// @route   GET /api/opportunities/:id/matches
exports.getOpportunityMatches = async (req, res) => {
    try {
        let opportunity;
        let volunteers;

        if (mongoose.connection.readyState !== 1) {
            opportunity = tempStore.opportunities.find(o => o._id === req.params.id);
            if (!opportunity) {
                return res.status(404).json({ message: 'Opportunity not found in demo mode' });
            }
            volunteers = tempStore.volunteers;
            const matches = await matchingEngine.matchVolunteers(opportunity, volunteers);
            return res.json({ opportunity, matches });
        }

        opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        volunteers = await Volunteer.find({});
        const matches = await matchingEngine.matchVolunteers(opportunity, volunteers);
        
        res.json({ opportunity, matches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
