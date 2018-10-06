const User = require('../models/user.model');

module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch(err) {
    res.status(404).json({ message: 'User not found' });
  }
};
