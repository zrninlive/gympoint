import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import { addMonths, parseISO } from 'date-fns';

class EnrollmentsController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'This plan does not exist' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Invalid student_id' });
    }

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.total_amount,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'This plan does not exist' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Invalid student_id' });
    }

    const enrollment = await Enrollment.findByPk(id);

    const enrollmentUpdated = await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.total_amount,
    });

    return res.json(enrollmentUpdated);
  }

  async show(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
      attributes: [
        'id',
        'start_date_formatted',
        'end_date_formatted',
        'price',
        'active',
      ],
    });

    return res.json(enrollments);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Enrollment.destroy({
      where: {
        id,
      },
    });

    return res.send();
  }
}

export default new EnrollmentsController();
