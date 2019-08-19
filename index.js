const redis = require('redis');
const client = redis.createClient(6379,'52.221.198.120');
const port = process.env.PORT || 3000;
const fastify = require('fastify')({
    logger: true
})


fastify.get('/', (req, res) => {
    const { image, keystore, expire } = req.query;

    if (!image || !keystore) {
        return res.callNotFound()
    }
    const expired = expire ? expire : 600;
    client.setex(keystore, expired, image);
    res.send({ success: true, url_image: `http://${req.headers.host}/image/${keystore}` })

})

fastify.get('/image/:keystore', (req, res) => {
    const keystore = req.params.keystore;
    client.get(keystore, function (err, data) {
        if (err) throw err;

        if (data != null) {
            const base64Data = data.replace(/^data:image\/png;base64,/, "").replace(/ /g, "+");
            const img = Buffer.from(base64Data, 'base64');
            res.header('Content-Type', 'image/png')
            res.send(img)

        } else {
            res.callNotFound()
        }
    });

})


// Run the server!
fastify.listen(port, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
})