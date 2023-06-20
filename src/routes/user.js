const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const{createNewUser , generateAuthToken} = require('./controllers')
const router = new express.Router()

router.post('/signup' ,async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
    res.status(200).json({user,token})
}catch(error){
    res.status(400).send(error.message)

}
})

router.post('/login',async(req ,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(err){
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

router.delete('/me', auth, async (req, res) => {
    
    try {
        const user =await User.findByIdAndDelete(req.user._id)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router 