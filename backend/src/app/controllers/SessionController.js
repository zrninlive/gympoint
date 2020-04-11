import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';
import Student from '../models/Student';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(401).json({ error: 'validation fails' });
    }

    const user = await User.findOne({ where: { email } });
    // return res.json(user);
    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Invalid password',
      });
    }

    const { name, id } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async students(req, res) {
    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({
        error: 'Student not found, try again!',
      });
    }

    return res.json(student);
  }
}

export default new SessionController();
