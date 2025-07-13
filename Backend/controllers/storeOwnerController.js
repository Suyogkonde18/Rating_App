const Store = require('../models/store');
const bcrypt = require('bcryptjs');

exports.getRatings = async (req, res) => {
  const store = await Store.findOne({ owner: req.user._id }).populate('ratings.userId', 'name email');
  res.json(store.ratings);
};

exports.getAvgRating = async (req, res) => {
  const store = await Store.findOne({ owner: req.user._id });
  res.json({ avgRating: store.avgRating });
};