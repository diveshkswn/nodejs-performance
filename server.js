const express = require("express");
const { longTask } = require("./utils");

const app = express();

app.get("/", async (req, res) => {
    let data = longTask("data from main event loop", 5000);   // Executing long task in main event loop.
    console.log("Request:::", req.url);
    res.status(200).json({ name: "Divesh", data: data })
})


app.listen(3000, () => {
    console.log("Server Started")
});   