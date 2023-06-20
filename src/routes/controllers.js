require('dotenv').config()
const jwt = require('jsonwebtoken')
const { hashData, verifyHashedData} = require('../utility/hashData');
const User = require('../models/User')




const createNewUser = async (data)=> {
    try{
        const {name, email,password} = data;
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw Error ('user is already exist !')
        }
         const hashedPassword =await hashData(password)
         const newUser = new User({
            name,
            email,
            password: hashedPassword
         })
         const createdUser = await newUser.save()
         return createdUser

    }
    catch(error){
        throw error
    }
}
const generateAuthToken = async() => {
    const user = this
    const token = jwt.sign( user._id, process.env.PR_KEY)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

module.exports = { createNewUser, generateAuthToken }