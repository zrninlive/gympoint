import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';
import { Container } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="GymPoint" />
      <Form onSubmit={handleSubmit} autoComplete="false">
        Seu e-mail
        <Input placeholder="exemplo@email.com" name="email" id="email" />
        Sua Senha
        <Input placeholder="**********" name="password" type="password" />
        <button className="btn" type="submit">
          Entrar no sistema
        </button>
      </Form>
    </Container>
  );
}
