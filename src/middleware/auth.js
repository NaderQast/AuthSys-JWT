const jwt = require('jsonwebtoken')
const User = require('../models/User')


const auth = async(req ,res ,next) => {
    try{    
        const token = req.header('Authorization').replace('Bearer ', '') || req.body.token || req.query.token || req.headers["x-access-token"]
        const decodedToken = jwt.verify(token , process.env.PR_KEY)
        const user = await User.findOne({ _id: decodedToken._id.toString(), 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        
        req.token = token
        req.user = user 
        next()
    }catch(error){
        res.status(401).send({error:'please authenticate'})
    }
}

module.exports = auth 