const express = require('express');
const { getRatings, getAvgRating } = require('../controllers/storeOwnerController');
const { protect } = require('../middelware/authMiddleware');
const { roleCheck } = require('../middelware/roleMiddleware');

const router = express.Router();

router.get('/ratings', protect, roleCheck(['store_owner']), getRatings);
router.get('/avg-rating', protect, roleCheck(['store_owner']), getAvgRating);

module.exports = router;
