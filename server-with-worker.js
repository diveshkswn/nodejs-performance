const express = require("express");
const { longTask, runWorker } = require("./utils");

const app = express();

app.get("/", async (req, res) => {
    // let data = longTask("data from main event loop", 5000);   // Executing long task in main event loop.
    let data = await runWorker("Data from worker thread", 5000);  //Executing long task with worker thread.
    console.log("Request:::", req.url);
    res.status(200).json({ name: "Divesh", data: data })
})


app.listen(3000, () => {
    console.log("Server Started")
});   