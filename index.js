const express = require("express")
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

require("./routes/recommendation.routes")(app);

// app.get('/recommendations', (req, res) => {
//     res.send(recommendations)
// })
//
// app.post('/recommendations', async (req, res) => {
//     const id = randomBytes(4).toString('hex');
//     const {title, description, selectedSong} = req.body;
//
//     recommendations[id] = {id, title, description, selectedSong};
//
//     await axios.post("http://localhost:8005/events", {
//         type: "RecommendationCreated",
//         data: {
//             id, title, description, selectedSong
//         }
//     })
//
//     // writeRecommendationsData(id, title)
//
//     res.status(201).send(recommendations[id])
// })
//
// app.post('/events', (req, res) => {
//     console.log("Event received", req.body.type);
//
//     res.send({})
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});