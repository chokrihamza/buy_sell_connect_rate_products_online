const mongoose = require('mongoose');

module.exports = User = mongoose.model('user', new mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      email: String,
      password: String,
      phoneNumber: String,
}))