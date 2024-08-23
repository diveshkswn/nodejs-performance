const path = require('path');
const { Worker } = require('worker_threads');
const { data } = require('./data');


function longTask(value, time) {
    const startTime = Date.now();
    while (startTime + time > Date.now()) {
    }
    return value;
}


async function runWorker(data, time) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, "worker.js"),
            { workerData: { data, time } }
        )
        worker.on("message", (value) => {
            console.log("Worker value : ", value);
            resolve(value);
        });
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });

    })
}

async function runWorkerFn(functionToCall, ...args) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, "dynamic-worker.js"),
            { workerData: { functionToCall: functionToCall.toString(), args } })
        worker.on("message", (value) => {
            console.log("Worker value : ", value);
            resolve(value);
        });
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });

    })
}

async function getUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = data.find(_i => _i.id === id);
            if (user) {
                resolve(user);
            }
            else {
                reject("User Not Found")
            }
        }, 3000);
    })
}



module.exports = {
    longTask,
    runWorker,
    runWorkerFn,
    getUserById
}

