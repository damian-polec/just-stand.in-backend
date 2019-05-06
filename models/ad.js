const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  adDesc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  preference: {
    type: Schema.Types.ObjectId,
    ref: 'Preference'
  }
}, {timestamps: true})

module.exports = mongoose.model('Ad', adSchema);