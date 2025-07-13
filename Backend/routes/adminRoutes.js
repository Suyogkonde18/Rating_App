    const express = require('express');
    const router = express.Router();

    const{addUser, addStore, getDashboard} = require('../controllers/adminController');
    const { protect } = require('../middelware/authMiddleware');
    const{roleCheck} = require('../middelware/roleMiddleware');

    router.post('/add-user', protect, roleCheck(['admin']), addUser);
    router.post('/add-store', protect, roleCheck(['admin']), addStore);
    router.get('/dashboard', protect, roleCheck(['admin']), getDashboard);
    module.exports = router;
