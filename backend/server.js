const server = require("./app");
server.listen(4000, (req, res)=>{
    console.log("server is listening on http://localhost:4000");
})