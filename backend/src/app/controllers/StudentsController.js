import * as Yup from 'yup';

import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const students = await Student.findAll();

    res.json(students);
  }

  async store(req, res) {
    const { email, name, weight, birth_date, height } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      weight: Yup.number().required(),
      birth_date: Yup.date().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(401).json({ error: 'validation fails' });
    }

    const student = await Student.findOne({ where: { email } });

    if (student) {
      return res.status(401).json({
        error: 'Student already exists',
      });
    }

    await Student.create(req.body);

    return res.json({
      email,
      name,
      birth_date,
      weight,
      height,
    });
  }

  async update(req, res) {
    console.log(req.body);
    const student = await Student.findByPk(req.params.id);

    const studentUpdated = await student.update(req.body);

    return res.json(studentUpdated);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);
    return res.json(student);
  }
}

export default new StudentsController();
