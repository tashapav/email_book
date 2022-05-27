
const { Sequelize } = require('sequelize')

// For security reasons data for database is stored by the developer
module.exports = new Sequelize(
    'db',
    'user',
    'password',
    {
        dialect: 'postgres',
        host: '',
        port: 5432,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }

)
