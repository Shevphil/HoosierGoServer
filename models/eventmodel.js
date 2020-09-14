module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('anevent', {
        owner: {
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        contentImage: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
    })
    return Event;
}