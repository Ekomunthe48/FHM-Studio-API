const { Sequelize } = require('sequelize');

const Connection =  new Sequelize( 'dbgallery', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const test = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('Welcome To Anime World');
      } catch (error) {
        console.error('You are the Cheater', error);
    }
}

test(Connection)

module.exports = Connection;