const express = require("express");
const { getUserById } = require("./utils");
const redisUtils = require("./rediutils");

const app = express();

redisUtils.redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Optional: Handle connection events
redisUtils.redisClient.on('connect', async () => {
    console.log('Connected to Redis \x1b[32m✔\x1b[0m');
    console.log("Redis Client Id : ", await redisUtils.redisClient.CLIENT_ID())
});



// Middleware to cache responses
async function redisUserCache(req, res, next) {
    const { id } = req.params;

    let redisId = `User_${id}`;
    try {
        const data = await redisUtils.getValue(redisId);
        if (data !== null) {
            res.status(200).send(JSON.parse(data));
        } else {
            next();
        }
    }
    catch (err) {
        console.error('Redis Error getting value:', err);
    }

}

app.get("/user/:id", redisUserCache, async (req, res) => {
    try {
        let id = req.params["id"]
        let user = await getUserById(Number(id));
        console.log("Request:::", req.url);
        if (user) {
            // Save response in Redis
            let redisId = `User_${id}`;
            await redisUtils.setexValue(redisId, 200, user);  //seting for 200 sec.
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    }
    catch (err) {
        res.status(400).json({ data: err })
    }
})


app.listen(3000, async () => {
    console.log("Server Started on port 3000  \x1b[32m✔\x1b[0m");
    await redisUtils.redisClient.connect()
});


// Properly close Redis connection on shutdown
process.on('SIGINT', async () => {
    console.log('Closing Redis client...');
    await redisUtils.redisClient.quit();
    console.log('Stopping Server...');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Closing Redis client...');
    await redisUtils.redisClient.quit();
    console.log('Stopping Server...');
    process.exit(0);
});