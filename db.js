const Sequelize = require('sequelize');
const sequelize = new Sequelize('hoosier-api', 'postgres', 'Shevph1L!_', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to hoosier-api postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/usermodel');
Post = sequelize.import('./models/postmodel');
UserComment = sequelize.import('./models/commentmodel');
UserEvent = sequelize.import('./models/eventmodel'); 
User.hasMany(Post, {
    onDelete: 'cascade'
  })
Post.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})
Post.hasMany(UserComment, {
    onDelete: 'cascade'
})
UserComment.belongsTo(Post, {
    foreignKey: {
        allowNull: false
    }
})
User.hasMany(UserEvent, {
    onDelete: 'cascade'
})
UserEvent.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})






module.exports = sequelize;