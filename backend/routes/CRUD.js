const User = require('../models/User');

exports.Insert= async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.Find_All= async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.Find_by_ID= async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.Update= async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.Delete=async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('User not found');
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

