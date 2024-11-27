const router = require('express').Router()
const Employee = require('./employee')
const { Op } = require('sequelize')


router.route('/employee')
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
            const employee = await Employee.create(req.body);
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create employee', details: err });
        }
    })

router.route('/employee/:id')
    .get(async (req, res) => {
        try {
            if (req.params.id && !isNaN(Number(req.params.id))) {
                const employee = await Employee.findByPk(req.params.id);
                if (employee)
                    res.json(employee);
                else {
                    res.sendStatus(404)
                }
            } else {
                res.status(400).json({ error: 'Invalid id' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to create employee', details: err });
        }
    })
    .put(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);

            if (employee) {
                const updatedEmployee = await employee.update(req.body);
                res.json(updatedEmployee);

            } else {
                res.sendStatus(404)
            }

        } catch (error) {

        }
    })

router.get('/employees/filter', async (req, res) => {
    try {
        const birthYear = req.query.birthYear

        const employees = await Employee.findAll({
            where: birthYear ? { birthYear: { [Op.gt]: birthYear } } : undefined
        })

        res.json(employees)

    } catch (err) {
        res.status(500).json({ error: 'Failed to get employees', details: err });

    }
})

router.get('/employees-projection', async (req, res) => {
    try {
        const employees = await Employee.findAll(
            {
                attributes: [['firstName', 'First Name'], 'lastName', 'birthYear']
            }
        );

        res.json(employees)

    } catch (err) {
        res.status(500).json({ error: 'Failed to get employee', details: err });
    }
})

module.exports = router; 