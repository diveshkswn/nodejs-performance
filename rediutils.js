const redis = require('redis');
require("dotenv").config()

// Create a Redis client
const client = redis.createClient({ url: process.env.REDIS_URL });  //Redis Cloud url has to be added.

// https://dev.to/ramko9999/host-and-use-redis-for-free-51if




// Get a value from Redis
async function getValue(key) {
    try {
        const value = await client.get(key);
        console.log(`Value for ${key}:`, value);
        return value;
    } catch (err) {
        console.error('Error getting value:', err);
    }
}

// Set a value in Redis
async function setValue(key, value) {
    try {
        await client.set(key, JSON.stringify(value));
        console.log(`Value set for ${key}`);
    } catch (err) {
        console.error('Error setting value:', err);
    }
}

async function setexValue(key, time = 1000, value) {
    try {
        await client.setEx(key, time, JSON.stringify(value)); // Cache for 1 hour
        console.log(`Value set for ${key}`);
        return;
    } catch (err) {
        console.error('Error setting value:', err);
        return;
    }
}




module.exports = {
    getValue,
    setValue,
    setexValue,
    redisClient: client,
}