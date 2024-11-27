const express = require('express')
const sequelize = require('./sequelize')
const employeeRouter = require('./employeeRouter')
const Employee = require('./employee')

const app = express();
const port = 3000;

app.use(express.json())
app.use(employeeRouter);


sequelize.sync({ alter: true })
    .then(async () => {
        console.log('All entities have been synchronized');

        try {
            const count = await Employee.count();
            if (count === 0) {
                await Employee.bulkCreate([
                    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', birthYear: 1980 },
                    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', birthYear: 1990 },
                    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', birthYear: 1975 },
                    { firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', birthYear: 1985 },
                    { firstName: 'Charlie', lastName: 'Williams', email: 'charlie.williams@example.com', birthYear: 1995 }
                ]);

                console.log('Employees added successfully because the table was empty.');
            } else {
                console.log('No employees were added because the table already has data.');
            }
        } catch (error) {
            console.error('Error adding employees:', error);
        }
    })


app.listen(port, () => {
    console.log('Server is listening on', port);
})

