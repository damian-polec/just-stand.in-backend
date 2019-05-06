const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  avatar: {
    type: String
  },
  age: {
    type: String
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  profileDesc: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Setting', settingSchema);