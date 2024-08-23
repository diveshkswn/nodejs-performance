const cluster = require('node:cluster');
const express = require("express");
const { longTask } = require("./utils");

if (cluster.isMaster) {

    // server-with-cluster will be executed again but in child mode 
    cluster.fork();
    cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
}
else {

    const app = express();

    app.get("/", async (req, res) => {
        let data = longTask("data from main event loop", 1000);   // Executing long task in main event loop.
        console.log("Request:::", req.url, process.pid);
        res.status(200).json({ name: "Divesh", data: data, processId: process.pid })
    })

    app.get("/fast", async (req, res) => {
        // Executing long task in main event loop.
        console.log("Request:::", req.url);
        res.status(200).json({ name: "Divesh", data: "Fast Route", processId: process.pid })
    })
    app.listen(3000, () => {
        console.log("Server Started with PID", process.pid)
    });
}