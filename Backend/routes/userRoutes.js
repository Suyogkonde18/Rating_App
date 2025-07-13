const express = require('express');
const { updateUser, getStores, submitRating } = require('../controllers/userController');
const { protect } = require('../middelware/authMiddleware');
const router = express.Router();

router.post('/update-user', protect, updateUser);
router.get('/stores', protect, getStores);
router.post('/submit-rating', protect, submitRating);

module.exports = router;
