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
module.exports = sequelize;