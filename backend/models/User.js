const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }, // In a real app, you'd want to hash this
});

const User = mongoose.model('User', userSchema);

module.exports = User;
