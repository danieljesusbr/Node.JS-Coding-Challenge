const jwt = require('./../utils/jwt');
const User = require('../models/user.model');
const auth = require('../utils/auth');

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('_id password email name').exec();
  if (!user) {
    return res.status(500).json({ message: 'Email or password does not match' });
  }
  try {
    await auth.authenticate(user.password, req.body.password);
    const token = jwt.sign(user);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch(err) {
    res.status(500).json({ message: 'Email or password does not match' });
  }
};

module.exports.register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(user);
    await user.save();
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (err) {
    res.status(400).json({ message: 'It was not possible to register user' });
  }
};
