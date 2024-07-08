const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload'); // Import the Multer middleware

router.post('/register', upload.single('image'), userController.registerUser);
router.get('/user', userController.getAllUsers);
router.post('/login', userController.loginUser);

module.exports = router;
