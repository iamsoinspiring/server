const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Image = require('../models/image.js')
const key = process.env.SECRET_KEY

class Users{
    static create(req,res){
        let salt = bcrypt.genSaltSync(8);
        let password = bcrypt.hashSync(req.body.password, salt);
        
        
        User.create({
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            password: password,
            image_list:[]

        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req,res){
        User.find({$or: [{email: req.body.Uname_email}, {username: req.body.Uname_email}]})
        .then(user => {
            if(user.length !== 0){
                let checkPass = bcrypt.compareSync(req.body.password, user[0].password);
                if(checkPass){
                    //untuk sementara token taruh di headers, setelah ngerjain client ditaruh di localstorage
                    let token = jwt.sign({ id: user[0]._id, fullname: user[0].full_name , email: user[0].email, image_list: user[0].image_list}, key);
                    res.status(200).json({message:`Happy to see you again ${user[0].full_name}`, token: token})
                } else {
                    res.status(400).json('Wrong password')
                }
            } else {
                res.status(400).json('Your email/username is wrong')
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static findUser(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        User.findOne({_id: user.id})
        .populate('image_list')
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static update(req,res){
        User.updateOne({_id: req.params.id},{
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
        })
        .then(user => {
            res.status(200).json('Profile succesfully updated!')
            
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static delete(req,res){
        User.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json('Account deleted, Bye!')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static uploadImage(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        Image.create({
            url: req.file.cloudStoragePublicUrl,
            description: req.body.desc
        })
        .then(image => {
            User.update({_id: user.id},{$push: {image_list: image._id}})
            .then(user => {
               res.status(200).json({status:'Your file is successfully uploaded',image: image})
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static getImage(req,res){
        Image.find({})
        .then(image => {
            res.send(image)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Users