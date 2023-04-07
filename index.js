const express = require("express")
const {randomBytes} = require('crypto')
const bodyParser = require("body-parser")
const {post} = require("axios");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json())
app.use(cors())

const recommendations = {};

app.get('/recommendations', (req, res) => {
    res.send(recommendations)
})

app.post('/recommendations', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    recommendations[id] = {id, title};

    console.log(req.body)

    await axios.post("http://localhost:8005/events", {
        type: "RecommendationCreated",
        data: {
            id, title
        }
    })


    res.status(201).send(recommendations[id])
})

app.post('/events', (req, res) => {
    console.log("Event received", req.body.type);

    res.send({})
});

app.listen(8000, () => {
    console.log("Listening on 8000")
})