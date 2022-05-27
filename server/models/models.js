
const sequelize = require('../db')
const { DataTypes } = require('sequelize')



const User = sequelize.define('user', {
    userId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userEmail: {type: DataTypes.STRING, unique: true},
    userPassword: {type: DataTypes.STRING}
    
})

const Contact = sequelize.define('contact', {
    contactId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    contactName: {type: DataTypes.STRING, unique: true},
    contactEmail: {type: DataTypes.STRING}
})

User.hasMany(Contact)
Contact.belongsTo(User)

module.exports = { User, Contact }
