// I used here a local database but i can use a mongodb cluster if you want 


require('dotenv').config() ;

const mongoose = require('mongoose')



mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,
useUnifiedTopology:true}).then(() => {
    console.log('Connected to DB')
}).catch((error)=>{
    console.log(error)
})