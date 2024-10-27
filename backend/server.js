const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // User model
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8081', // Update this to match your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://bhavesh39shinde:kquUi9PRCBdxON9j@cluster1.rb3ob.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// User routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User registration
app.post('/api/users', [
  body('username').notEmpty().withMessage('Username is required.'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password }); // Ensure you only set username and password
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // Handle potential errors
    res.status(400).json({ message: error.message });
  }
});

// Login route
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password (assuming plaintext for this example)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.json({ username: user.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Password Route
app.put('/api/users/update-password', [
  body('username').notEmpty().withMessage('Username is required.'),
  body('newPassword').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { username, newPassword } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      user.password = newPassword; // Update password (consider hashing it before saving)
      await user.save();

      res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.delete('/api/users/:id', async (req, res) => {
  try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
