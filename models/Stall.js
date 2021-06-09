const mongoose = require('mongoose')

const StallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = stall = mongoose.model('stall', StallSchema)