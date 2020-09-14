module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('apost', {
        owner: {
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
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
    return Post;
}