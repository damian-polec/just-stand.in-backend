const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports = {
  login: async function( { userInput: {email, password}} ) {
    console.log(email);
    const user = await User.findOne({email: email});
    if(!user) {
      const error = new Error('User not found');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) {
      const error = new Error('Wrong password');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h'}
    );
    return { token: token, userId: user._id.toString() };
  }
}