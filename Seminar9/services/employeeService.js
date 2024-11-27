const Employee = require('../models/employee');
const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

router
    .route('/employee')
    .get(async (req, res) => {
        try {
            const employees = await Employee.findAll(); 
            res.status(200).json(employees);
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve employees', details: err });
        }
    })
    .post(async (req, res) => {
        try {
            const newEmployee = await Employee.create(req.body);

            res.json(newEmployee);
        } catch (err) {
            res.status(500).json(err);
        }
    })

//5. Where clause
router.route('/employee/filter').get(async (req, res) => {
    const { minSalary, lastName, firstName } = req.query;

    try {
        const conditions = [];
        if (lastName) {
            conditions.push({ lastName });
        }
        if (firstName) {
            conditions.push({ firstName });
        }

        const whereClause = {
            ...(conditions.length > 0 && { [Op.or]: conditions }),
            ...(minSalary && { salary: { [Op.gt]: +minSalary } }),
        };

        const employees = await Employee.findAll({
            where: whereClause,
        });

        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve filtered employees', details: err });
    }
});


//4. Id requests
router
    .route('/employee/:id')
    .get(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                res.status(200).json(employee);

            } else {
                res.status(404).json({ error: `Employee with id: ${req.params.id} not found` })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                const updatedEmployee = await employee.update(req.body)
                res.status(200).json(updatedEmployee);

            } else {
                res.status(404).json({ error: `Employee with id: ${req.params.id} not found` })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })
    //Ex4. implementează ștergerea unei înregistrări pe un nou endpoint.
    .delete(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                const result = await employee.destroy();
                res.status(200).send(`Emplyee with id ${req.params.id} is deleted`);

            } else {
                res.status(404).json({ error: `Employee with id: ${req.params.id} not found` })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    })



//6. Projections
router.get('/simplified-employees', async (req, res) => {

    try {
        const employees = await Employee.findAll(
            {
                attributes: { exclude: 'id' }
            }
        );
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Ex6. implementează o sortare (ordonare) pentru query-ul get all employees, în funcție de un câmp primit ca și query param.
router.get('/sort-employees/:field', async (req, res) => {
    try {
        const { field } = req.params

        const allowedFields = ['firstName', 'lastName', 'email', 'salary', 'birthYear'];

        if (!allowedFields.includes(field)) {
            return res.status(400).json({ error: 'Invalid field parameter' });
        }

        const sortedEmployees = await Employee.findAll({
            order: [[field, 'DESC']]
        })

        res.status(200).json(sortedEmployees);

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router