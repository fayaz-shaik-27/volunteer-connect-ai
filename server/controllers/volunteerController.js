const Volunteer = require('../models/Volunteer');
const mongoose = require('mongoose');
const tempStore = require('../config/tempStore');

// @desc    Register a volunteer
// @route   POST /api/volunteers
exports.registerVolunteer = async (req, res) => {
    try {
        const { name, email, phone, location, skills, availability } = req.body;
        
        if (mongoose.connection.readyState !== 1) {
            console.log('Using Demo Mode: Registering volunteer in-memory');
            const newVolunteer = { _id: Date.now().toString(), name, email, phone, location, skills, availability };
            tempStore.volunteers.push(newVolunteer);
            return res.status(201).json(newVolunteer);
        }

        const volunteerExists = await Volunteer.findOne({ email });
        if (volunteerExists) {
            return res.status(400).json({ message: 'Volunteer already exists' });
        }

        const volunteer = await Volunteer.create({
            name, email, phone, location, skills, availability
        });

        res.status(201).json(volunteer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
exports.getVolunteers = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(tempStore.volunteers);
        }
        const volunteers = await Volunteer.find({});
        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
