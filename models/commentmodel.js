module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('commenttable', {
        owner: {
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull:false,
        },
           
    })
    return Comment;
}