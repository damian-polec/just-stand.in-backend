const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../../../models/user');

module.exports = {
  createUser: async function({ userInput }, req) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'E-Mail is invalid' });
    }

    if (
      validator.isEmpty(userInput.password) || 
      !validator.isLength(userInput.password, { min: 6 })
      ) {
        errors.push({ message: 'Password too short' });
      }
    
    if (errors.length > 0) {
      const error = new Error('Invalid input');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({email: userInput.email});
    if (existingUser) {
      const error = new Error('User exist already');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  deleteUser: async function({ id }, req) {
    if(!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    await User.findByIdAndDelete(id)
    return true;
  }
}