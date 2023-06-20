const bcrypt = require('bcrypt')

const hashData = async (data , saltRounds = 8) => {
    try{
        const hashedData = await bcrypt.hash(data , saltRounds)
        return hashedData 
    }catch(error){
        throw error
    }
}

const verifyHashedData = async(unhashed , hashed) => {
    try{
        const match = await bcrypt.compare(unhashed, hashed)
        return match 
    }catch(error){
        throw Error
    }
}

module.exports = {hashData , verifyHashedData}