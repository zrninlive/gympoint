import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';

class CheckinsController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const weeklyCheckins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (weeklyCheckins.count >= 5) {
      return res.status(401).json({
        error: "you've already exceded the limit of checkins in last 7 days ",
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinsController();
