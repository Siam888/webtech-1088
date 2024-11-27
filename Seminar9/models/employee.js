const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

//2. Entities

const Employee = sequelize.define(
    "Employee",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            //Ex.3 adaugă un validator suplimentar pe entitate pentru ca numele să aibă între 3 și 10 caractere.
            validate: {
                len: [3, 10]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            //Ex.3 adaugă un validator suplimentar pe entitate pentru ca numele să aibă între 3 și 10 caractere.
            validate: {
                len: [3, 10]
            }
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
        },
        //Ex2. adaugă un câmp suplimentar “salary”, cu o valoare default de 0 și cu o validare pentru valoarea minimă de 0.
        salary: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    }
)

module.exports = Employee
