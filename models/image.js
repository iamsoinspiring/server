const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let imageSchema = new Schema({
  url: {
    type: String,
    required: [true, 'Please input your image']
  },
  description: String
  })

let Image = mongoose.model('Image', imageSchema)


module.exports = Image

