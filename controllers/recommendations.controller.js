const db = require("../models");
const Recommendation = db.recommendations;
const Op = db.Sequelize.Op;

// Create and Save a new Recommendation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const recommendation = {
        title: req.body.title,
        description: req.body.description,
        song: req.body.selectedSong
    };

    // Save Recommendation in the database
    Recommendation.create(recommendation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Recommendations from the database.
exports.findAll = (req, res) => {
    Recommendation.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findAllUser = (req, res) => {
    const user_id = req.params.id;

    Recommendation.findAll({
        where: {user_id: user_id},
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all recommendations."
            });
        });
};

// Find a single Recommendation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recommendation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Recommendation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Recommendation.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Recommendation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recommendation with id=${id}. Maybe Recommendation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recommendation with id=" + id
            });
        });
};

// Delete a Recommendation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recommendation.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Recommendation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recommendation with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recommendation with id=" + id
            });
        });
};

// Delete all Recommendations from the database.
exports.deleteAll = (req, res) => {
    Recommendation.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} recommendations were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all recommendations."
            });
        });
};

// Delete all Recommendations from the database.
exports.deleteAllUser = (req, res) => {
    const user_id = req.params.id;

    Recommendation.destroy({
        where: {user_id: user_id},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} recommendations were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all recommendations."
            });
        });
};

// find all published Recommendation
exports.findAllPublished = (req, res) => {
    Recommendation.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving recommendations."
            });
        });
};