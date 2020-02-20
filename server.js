const express = require("express")
const server = express()

server.get("/", function(req, res) {
    return res.send("Ok, cheguei ao /")
})

server.listen(3000, function() {
    console.log("Start server...")
})