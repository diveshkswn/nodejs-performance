// worker.js
const { parentPort, workerData } = require('worker_threads');
const { longTask } = require('./utils');

// A CPU-intensive task (e.g., calculating Fibonacci numbers)

const { data, time } = workerData
// Perform the task and send the result back to the main thread
const result = longTask(data, time)
parentPort.postMessage(result);