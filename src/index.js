const express = require("express");

const app = express();

app.get("/health", (req, res) => {
    res.send("OK")
})

app.listen(3001, (req, res) => {
    console.log("Server started on port 3001");
})