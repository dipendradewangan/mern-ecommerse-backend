const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
        const {connection} = await mongoose.connect("mongodb://127.0.0.1:27017/expressErrorHandling");
        console.log(`database connected with ${connection.host}`)

    }
    catch(err){
        console.log(err)
    }
}


module.exports = connectDb;