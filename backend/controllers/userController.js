const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get the path of the uploaded image
    const imagePath = req.file.filename
    console.log('Uploaded file path:', imagePath); // Debugging statement

    // Create a new user with the hashed password, other details, and image path
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phone,
      image: imagePath // Store the image path in the database
    });

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
};


  
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      const usersWithImageUrls = users.map(user => ({
        ...user.toObject(),
        image: user.image ? `http://localhost:5000/${user.image}` : null
      }));
      res.status(200).json(usersWithImageUrls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log( email, password)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(user.password)

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, jwtSecret, {expiresIn : '1h' });
      res.status(200).json({ token, user});
    } catch (error) {
      res.status(500).json({ error: 'Error logging in user' });
    }
  };