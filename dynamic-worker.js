// worker.js
const { parentPort, workerData } = require('worker_threads');
const { longTask } = require('./utils');

const { functionToCall, args } = workerData;

// Perform the task and send the result back to the main thread
const result = eval(`(${functionToCall})`)(...args);
parentPort.postMessage(result);