const server = require("./app");
const dotenv = require("dotenv");


dotenv.config({path : "backend/config/config.env"});


server.listen(process.env.PORT, (req, res)=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})