const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Please Enter a Email'],
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email not valid')
            }
        }
    },
    password:{
        type:String,
        required:[true,'please eneter password'],
        minlength:7,
        trim:true,
    },
    tokens:[{token:{
        type:String,
        required:true}}],
},
    { timestamps:true
    })
UserSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },'nuttertools')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


// I can also craet a Schema Virtual to make Products or data 
//related to that specific User


const User = mongoose.model('User', UserSchema)

module.exports = User 