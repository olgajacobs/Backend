const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  surname: {
    type: String,
    required: true,
    minLength: 2,
  },
  username: {
    type: String,
    required: true,
    minLength: 5,
  },
  mybooks: [{ _id: mongoose.Types.ObjectId, title: String, author: String, year: Number }],
});
module.exports = mongoose.model('user', userSchema);
