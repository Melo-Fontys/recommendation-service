const recommendations = require("../controllers/recommendations.controller");
module.exports = app => {
    const recommendations = require("../controllers/recommendations.controller.js");

    let router = require("express").Router();

    // Create a new Recommendation
    router.post("/", recommendations.create);

    // Retrieve all Recommendations
    router.get("/", recommendations.findAll);

    // Retrieve all Recommendations from one user
    router.get("/users/:id", recommendations.findAllUser);

    // Retrieve all published Recommendations
    router.get("/published", recommendations.findAllPublished);

    // Retrieve a single Recommendation with id
    router.get("/:id", recommendations.findOne);

    // Update a Recommendation with id
    router.put("/:id", recommendations.update);

    // Delete a Recommendation with id
    router.delete("/:id", recommendations.delete);

    // Delete all Recommendations
    router.delete("/", recommendations.deleteAll);

    // Delete all Recommendations made by an user with id
    router.delete("/users/:id", recommendations.deleteAllUser);

    app.use("/recommendations", router);
};