module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('a-user-as', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull:true
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        accountHolder: {
            type: DataTypes.INTEGER,
        }
    })
    return User;
}