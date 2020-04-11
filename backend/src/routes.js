import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlansController from './app/controllers/PlansController';
import EnrollmentsController from './app/controllers/EnrollmentsController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

import auth from './app/middlewares/auth';

const routes = Router();

routes.post('/session', SessionController.store);
routes.post('/session/students', SessionController.students);

routes
  .route('/students/:student_id/help-orders')
  .get(HelpOrdersController.findByStudent)
  .post(HelpOrdersController.store);

routes
  .route('/students/:student_id/checkins')
  .get(CheckinsController.index)
  .post(CheckinsController.store);

routes.use(auth);

routes
  .route('/students')
  .post(StudentsController.store)
  .get(StudentsController.index);

routes
  .route('/students/:id')
  .get(StudentsController.show)
  .put(StudentsController.update);

routes
  .route('/plans')
  .get(PlansController.index)
  .post(PlansController.store);

routes
  .route('/plans/:id')
  .put(PlansController.update)
  .get(PlansController.show)
  .delete(PlansController.delete);

routes
  .route('/enrollments')
  .get(EnrollmentsController.index)
  .post(EnrollmentsController.store);

routes
  .route('/enrollments/:id')
  .put(EnrollmentsController.update)
  .get(EnrollmentsController.show)
  .delete(EnrollmentsController.delete);

routes.get('/help-orders', HelpOrdersController.index);
routes.get('/help-orders/:id', HelpOrdersController.show);
routes.post('/help-orders/:id/answer', HelpOrdersController.update);

export default routes;
