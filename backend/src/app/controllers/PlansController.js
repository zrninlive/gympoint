import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({
        error: 'Invalid plan_id',
      });
    }

    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({
        error: 'Invalid plan_id',
      });
    }

    const planUpdated = await plan.update(req.body);

    return res.json(planUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Plan.destroy({
      where: {
        id,
      },
    });

    return res.json();
  }
}

export default new PlansController();
