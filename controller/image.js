const ticketmaster = require('ticketmaster');
const axios = require('axios')
const jwt = require('jsonwebtoken');
const User = require('../models/user')

class Quotes {
  static randomquotes(req, res) {
    console.log(process.env.SECRET_KEY)
    axios.get(`https://talaikis.com=${process.env.SECRET_KEY}`)
      .then(response => {
        res
          .status(200)
          .json(response.data)
      })

      .catch(err => {
        res
          .status(401)
          .json(err)
      })
  }
}

module.exports = image
