const FB = require('fb');
const User = require('../models/user')
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res) {
    let token = req.body.token

    FB.setAccessToken(token);

    FB.api('me', { fields: ['id', 'name', 'email'], access_token: token }, response => {
      User.findOne({
        email: response.email
      })

        .then(userData => {
          if (userData === null) {
            User.create({
              name: response.name,
              email: response.email,
              fbid: response.id,
            })

              .then(resultInput => {
                let tokenUser = jwt.sign({ id: resultInput._id, name: resultInput.name, email: resultInput.email }, process.env.SECRET_KEY)

                res
                  .status(200)
                  .json(tokenUser)
              })

              .catch (err => {
                res
                  .status(400)
                  .json(err)
              })
          }
          else {
            let tokenUser = jwt.sign({ id: userData._id, name: userData.name, email: userData.email }, process.env.SECRET_KEY)

                res
                  .status(200)
                  .json(tokenUser)
          }
        })

        .catch(err => {
          res
            .status(400)
            .json(err)
        })
    });
  }

  static signUp (req, res) {
    User.findOne({
      email: req.body.email
    })

      .then(userData => {
        if (userData === null) {
          User.create({
            name: req.body.name,
            email: req.body.email,
            fbid: req.body.id,
          })

            .then(resultInput => {
              let tokenUser = jwt.sign({ id: resultInput._id, name: resultInput.name, email: resultInput.email }, process.env.SECRET_KEY)

              res
                .status(200)
                .json(tokenUser)
            })

            .catch (err => {
              res
                .status(400)
                .json(err)
            })
        }
        else {
          let tokenUser = jwt.sign({ id: resultInput._id, name: resultInput.name, email: resultInput.email }, process.env.SECRET_KEY)

              res
                .status(200)
                .json(tokenUser)
        }
      })

      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  }

  static addCoordinate (req, res) {
    let token = req.headers.tokenUser;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    User.findOne({
      id : decoded.id
    })
      .then(userData => {
        if(userData !== null) {
          User
            .where({
              _id : (decoded.id)
            })
            .update({
              $SET : req.body
            })

            .then(updateData => {
              res
                .status (200)
                .json("Data has been updated!")
            })

            .catch(err => {
              res
                .status(400)
                .json(err)
            })
        }
        else {
          res
            .status(404)
            .json("Data not found!")
        }
      })

      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  }
}

module.exports = UserController
