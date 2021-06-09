const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    requred: true
  }
})

module.exports = section = mongoose.model('Section', SectionSchema)