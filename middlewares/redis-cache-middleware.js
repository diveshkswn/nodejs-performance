const redis = require('redis');

// Create a Redis client
const client = redis.createClient();


console.log("Redis Client Id : ", client.CLIENT_ID)

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware to cache responses
function redisCache(req, res, next) {
    const { id } = req.params;

    let redisId = `User_${id}`;

    client.get(redisId, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.status.send(JSON.parse(data));
        } else {
            next();
        }
    });
}

module.exports = {
    redisCache
}