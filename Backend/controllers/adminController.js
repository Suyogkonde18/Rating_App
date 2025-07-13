const User = require('../models/user');
const Store = require('../models/store');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, address, role });
  await user.save();
  res.json({ message: 'User added' });
};

exports.addStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  const store = new Store({ name, email, address, owner: ownerId });
  await store.save();
  res.json({ message: 'Store added' });
};

exports.getDashboard = async (req, res) => {
  const users = await User.countDocuments();
  const stores = await Store.countDocuments();
  const ratings = await Store.aggregate([{ $unwind: "$ratings" }, { $count: "totalRatings" }]);

  res.json({
    totalUsers: users,
    totalStores: stores,
    totalRatings: ratings[0]?.totalRatings || 0
  });
};
