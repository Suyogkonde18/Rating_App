const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 60 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+\@.+\..+/, 'Please enter a valid email'] 
  },
  password: { type: String, required: true },
  address: { type: String, maxlength: 400 },
  role: { 
    type: String, 
    enum: ['admin', 'normal', 'store_owner'], 
    default: 'normal' 
  }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema, 'user');
