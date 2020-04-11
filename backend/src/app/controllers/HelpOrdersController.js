import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrdersController {
  async store(req, res) {
    const { question } = req.body;
    const { student_id } = req.params;

    const student_question = await HelpOrder.create({ question, student_id });

    return res.json(student_question);
  }

  async index(req, res) {
    try {
      const questions = await HelpOrder.findAll({
        where: {
          answer: null,
        },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name'],
          },
        ],
      });

      return res.json(questions);
    } catch (error) {
      return res.json(error);
    }
  }

  async findByStudent(req, res) {
    try {
      const { student_id } = req.params;

      const helpOrders = await HelpOrder.findAll({
        where: {
          student_id,
        },
        order: [['createdAt', 'DESC']],
      });

      return res.json(helpOrders);
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    const question = await HelpOrder.findByPk(id);

    const gym_answer = await question.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(gym_answer);
  }

  async show(req, res) {
    const question = await HelpOrder.findByPk(req.params.id);

    return res.json(question);
  }
}

export default new HelpOrdersController();
