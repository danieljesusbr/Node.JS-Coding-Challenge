const mongoose = require('mongoose');
const { hashPassword } = require('../utils/auth');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, trim: true, default: '' },
  email: { type: String, unique: true, index: true, required: true, trim: true },
  password: { type: String, select: false }
});

const preSave = function preSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = hashPassword(this.password)
      .then((password) => {
        console.log(password);
        this.password = password;
        next();
      })
      .catch(next);
  } else {
    next();
  }
};

userSchema.pre('save', preSave);

module.exports = mongoose.model('User', userSchema);
