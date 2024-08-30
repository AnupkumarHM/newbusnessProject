const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload'); 
router.post('/register', upload.single('image'), userController.registerUser);
router.get('/user', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/users', async (req, res))
router.get('/users', async (req, res))
router.get('/users/:id', async (req, res))
router.put('/users/:id', async (req, res))
router.delete('/users/:id', async (req, res))
module.exports = router;
