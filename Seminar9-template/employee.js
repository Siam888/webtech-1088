const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

const Employee = sequelize.define('Employee',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        birthYear: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1900
            }
        }
    },
    { timestamps: false }
)

module.exports = Employee;