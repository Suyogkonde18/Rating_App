    const User= require('../models/user');
    const Store = require('../models/store');
    const bcrypt = require('bcryptjs');

    exports.updateUser = async (req, res) => {  
        const { name, email, password, address } = req.body;
        const userId = req.params.id;
    
        try {
            const user = await User.findById(userId);
            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
    
            if (password) {
            user.password = await bcrypt.hash(password, 10);
            }
            
            user.name = name || user.name;
            user.email = email || user.email;
            user.address = address || user.address;
    
            const updatedUser = await user.save();
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
        }

    exports.getStores = async (req, res) => {
  const { name, address } = req.query;
  let query = {};
  if (name) query.name = new RegExp(name, 'i');
  if (address) query.address = new RegExp(address, 'i');

  const stores = await Store.find(query);
  res.json(stores);
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const store = await Store.findById(storeId);

  const existingRating = store.ratings.find(r => r.userId.equals(req.user._id));
  if (existingRating) {
    existingRating.rating = rating;
  } else {
    store.ratings.push({ userId: req.user._id, rating });
  }

  store.avgRating = store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length;
  await store.save();

  res.json({ message: 'Rating submitted' });
};