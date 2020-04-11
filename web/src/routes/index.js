import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students/List';
import StudentsForm from '~/pages/Students/Form';

import Plans from '~/pages/Plans/List';
import PlansForm from '~/pages/Plans/Form';

import Enrollments from '~/pages/Enrollments/List';
import EnrollmentsForm from '~/pages/Enrollments/Form';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={StudentsForm} isPrivate />
      <Route path="/students/:id" component={StudentsForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={PlansForm} isPrivate />
      <Route path="/plans/:id" component={PlansForm} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={EnrollmentsForm}
        isPrivate
      />
      <Route path="/enrollments/:id" component={EnrollmentsForm} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="/" component={() => <h1>404 - Not Found</h1>} />
    </Switch>
  );
}
