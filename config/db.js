const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
         console.log(`Connected to mongodb database ${mongoose.connection.host}`.bgBlue.white)

    }
    catch(error){
       console.log(`MongoDB Database error ${error}`.bgBlue.white)
    }
}

module.exports = connectDB;