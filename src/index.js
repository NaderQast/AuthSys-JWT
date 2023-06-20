require('dotenv').config()
require('./config/db')
const express = require('express')


const UserRoutes = require('./routes/user')
const app = express()


const port = process.env.PORT
app.use(express.json())

app.use('/users',UserRoutes)

app.listen(port , () => {
    console.log('server is up on port ' + port)
})


module.exports = app 