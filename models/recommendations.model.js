module.exports = (sequelize, Sequelize) => {
    const Recommendation = sequelize.define("recommendations", {
        title: {
            type: Sequelize.STRING,
            field: 'title'
        },
        description: {
            type: Sequelize.STRING,
            field: 'description'
        },
        song: {
            type: Sequelize.STRING,
            field: 'song'
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id'
        },

    });

    return Recommendation;
};

