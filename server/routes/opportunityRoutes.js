const express = require('express');
const router = express.Router();
const { createOpportunity, getOpportunities, getOpportunityMatches } = require('../controllers/opportunityController');

router.post('/', createOpportunity);
router.get('/', getOpportunities);
router.get('/:id/matches', getOpportunityMatches);

module.exports = router;
