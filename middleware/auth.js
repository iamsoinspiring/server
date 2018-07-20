const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

class Auth{
    static cekToken(req,res,next){
        let user = jwt.verify(req.headers.token, key, function(err, decoded){
            if(err){
                next(err)
            } else {
                next()
            }
        })
        
    }
}

module.exports = Auth