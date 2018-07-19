const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let userSchema = new Schema({
  full_name: {
    type: String,
    required: [ true, 'Please input your name' ]
  },
  username: {
    type: String,
    unique: [ true, 'Username is already used' ],
    required: [ true, 'Please input username' ]
  },
  email: {
    type: String,
    unique: [ true, 'Email is already used' ],
    validate: {
      validator: (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
      },
      message: 'Email format is wrong'
    },
    required: [ true, 'Please input your email' ]
  },
  password: {
    type: String,
    required: [true, 'Please input your password']
  },
  image_list: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }]
}, {timestamps: true})


let User =mongoose.model('User', userSchema)

module.exports = User