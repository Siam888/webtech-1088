const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: "./sqlite/test.db"
    }
)


sequelize.sync({ alter: true }).then(() => {
    console.log("All models were synchronized successfully");

    const Employee = require('./models/employee');

    Employee.count().then(c => {
        if (c == 0) {
            Employee.bulkCreate([
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john.doe@example.com",
                    "birthYear": 1985,
                    "salary": 50000
                },
                {
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "email": "jane.smith@example.com",
                    "birthYear": 1992,
                    "salary": 60000
                },
                {
                    "firstName": "Alex",
                    "lastName": "Johnson",
                    "email": "alex.johnson@example.com",
                    "birthYear": 2000,
                    "salary": 12000
                },
                {
                    "firstName": "Emily",
                    "lastName": "Davis",
                    "email": "emily.davis@example.com",
                    "birthYear": 1978,
                    "salary": 75000
                },
                {
                    "firstName": "Michael",
                    "lastName": "Brown",
                    "email": "michael.brown@example.com",
                    "birthYear": 1980,
                    "salary": 10000
                }
            ]
            )

        }
    })

})

module.exports = sequelize;