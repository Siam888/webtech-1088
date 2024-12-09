// Express Initialisation
const express = require("express");
const app = express();
const port = 3000;

// Sequelize Initialisation
const sequelize = require("./sequelize");

// Import created models
const University = require("./models/university");
const Student = require("./models/student");
const Course = require('./models/course')

// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Define the model relationship.
University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, { through: 'enrollments' }) //Ne permite ca intr un obiect de tip "Student" sa avem metoda getCourses, addCourse, removeCourse
Course.belongsToMany(Student, { through: 'enrollments' });

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  sequelize.close()
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
      .then(() => console.log('Database synchronized successfully'))
      .catch(err => console.error('Error synchronizing database:', err));;
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/*
*  1. POST a student into a university
*/

app.post('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id
      await student.save();
      res.status(201).json({ message: 'Student created!' })
    } else {
      res.status(404).json({ message: '404 - University not found' })
    }
  } catch (error) {
    next(error)
  }
})

//Ex1. implementați get pentru copiii unui anumit părinte.

app.get('/universities/:universityId/students', async (req, res, next) => {
  try {
    const universityId = req.params.universityId
    if (universityId) {
      const students = await Student.findAll({
        where: { universityId: universityId }
      })

      res.json(students)
    } else {
      res.status(400).json({ message: 'Invalid university id' })
    }

  } catch (error) {
    next(error)
  }
})

// 2. GET the students of a specific university

app.get('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = University.findByPk(req.params.universityId,
      {
        include: [Student]
      }
    );

    if (university) {
      res.json(university.student)
    } else {
      res.status(404).json({ message: 'University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// Ex2. implementați metoda get pentru obținerea unui anumit copil al unui părinte.

app.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } })
      const student = students.shift()
      if (student) {
        res.status(202).json(student)
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});

// 3. PUT update student from a university

app.put('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } })
      const student = students.shift()
      if (student) {
        // student.studentFullName = req.body.fullName;
        // student.studentStatus = req.body.status;
        // await student.save();
        await student.update(req.body)
        res.json({ message: 'Student updated!' })
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

//  DELETE - Ex3. implementați ștergerea unei entități copil.

app.delete('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {

    const student = await Student.findOne({
      where: [
        { id: req.params.studentId }, { universityId: req.params.universityId }
      ]
    })

    if (student) {
      await student.destroy();
      res.json({ message: 'Student Deleted!' })
    } else {
      res.status(404).json({ message: 'Student Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

/**
 * GET the list of courses.
 */
app.get('/universities/:universityId/courses', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses();
      if (courses.length > 0) {
        response.json(courses);
      } else {
        response.sendStatus(204);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET a course by id.
 */
app.get('/universities/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({ where: { id: request.params.courseId } });
      const course = courses.shift();
      if (course) {
        response.json(course);
      } else {
        response.status(404).json({ message: 'Course Not Found!' });
      }
    } else {
      response.status(404).json({ message: 'University Not Found!' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST a new course.
 */
app.post('/universities/:universityId/courses', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const course = await Course.create(request.body);
      university.addCourse(course);
      await university.save();
      response.status(201).location(course.id).send();
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT to update a course.
 */
app.put('/universities/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({ where: { id: request.params.courseId } });
      const course = courses.shift();
      if (course) {
        await course.update(request.body);
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE a course.
 */
app.delete('/universities/:universityId/courses/:courseId', async (request, response, next) => {
  try {
    const university = await University.findByPk(request.params.universityId);
    if (university) {
      const courses = await university.getCourses({ where: { id: request.params.courseId } });
      const course = courses.shift();
      if (course) {
        await course.destroy();
        response.sendStatus(204);
      } else {
        response.sendStatus(404);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

// 4. GET - studentii care participa la un anumit curs al unei universitati

app.get('/universities/:universityId/courses/:courseId/enrollments', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ where: { id: req.params.courseId } })
      const course = courses.shift();
      if (course) {
        const students = await course.getStudents({ attributes: ['id'] });
        if (students.length > 0) {
          res.json(students)
        } else {
          res.sendStatus(204)
        }
      } else {
        res.status(404).json({ message: 'Course NOT FOUND!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// 4. POST - adaugare un student la un curs

app.post('/universities/:universityId/courses/:courseId/enrollments/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ where: { id: req.params.courseId } })
      const course = courses.shift();

      const students = await university.getStudents({ where: { id: req.params.studentId } })
      const student = students.shift();

      if (course && student) {
        course.addStudent(student);
        await course.save();
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Course or Student NOT FOUND!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// DELETE - stergere student de la un curs

app.delete('/universities/:universityId/courses/:courseId/enrollments/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ where: { id: req.params.courseId } })
      const course = courses.shift();

      const students = await university.getStudents({ where: { id: req.params.studentId } })
      const student = students.shift();
      if (course && student) {
        course.removeStudent(student);
        await course.save();
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Student or Course Not Found!' })
      }
    } else {
      res.status(404).json({ message: 'University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// GET - Ex4. implementați cererea get pentru lista de cursuri a unui student (GET /universities/:universityId/students/:studentId/enrollments)

app.get('/universities/:universityId/students/:studentId/enrollments', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } })
      const student = students.shift();
      if (student) {
        const courses = await student.getCourses()

        res.json(courses);
      } else {
        res.status(404).json({ message: 'Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: 'University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// 5. POST - import obiecte pe care le avem si in baza de date
app.post('/', async (req, res, next) => {
  try {
    const registry = {};
    for (const u of req.body) {
      const university = await University.create(u);
      for (const s of u.students) {
        const student = await Student.create(s);
        registry[s.key] = student;
        university.addStudent(student);
      }
      for (const c of u.courses) {
        const course = await Course.create(c);
        registry[c.key] = course;
        university.addCourse(course);
      }
      for (const e of u.enrollments) {
        registry[e.courseKey].addStudent(registry[e.studentKey])
        await registry[e.courseKey].save();
      }
      await university.save()
    }

    res.sendStatus(204);
  } catch (error) {
    next(error)
  }

})


//Ex.5 implementati export (se vor extrage parintii cu copiii lor de forma GET / care va intoarce in body un array de university unde university contine un array de students si courses plus enrollements ca perechi de id student si course
app.get('/', async (request, response, next) => {
  try {
    const result = [];
    for (let u of await University.findAll()) {
      const university = {
        name: u.universityName,
        students: [],
        courses: [],
        enrollements: []
      };
      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });
        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }
      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          studentFullName: s.studentFullName,
          studentStatus: s.studentStatus
        });
      }
      result.push(university);
    }
    if (result.length > 0) {
      response.json(result);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST a new student into a university.
 */
app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const result = [];
    for (let u of await University.findAll()) {
      const university = {
        name: u.name,
        students: [],
        courses: [],
        enrollements: []
      };
      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });
        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }
      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          firstName: s.firstName,
          lastName: s.lastName
        });
      }
      result.push(university);
    }
    if (result.length > 0) {
      response.json(result);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});


