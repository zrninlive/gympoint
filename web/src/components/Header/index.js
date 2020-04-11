import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo-internal.svg';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Link } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const currentUrl = window.location.href;

  const userName = useSelector(state => state.user.profile.name);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint Web" />
          <Link to="/students" active={!!currentUrl.includes('/students')}>
            Alunos
          </Link>
          <Link to="/plans" active={!!currentUrl.includes('/plans')}>
            Planos
          </Link>
          <Link
            to="/enrollments"
            active={!!currentUrl.includes('/enrollments')}
          >
            Matrículas
          </Link>
          <Link
            to="/help-orders"
            active={!!currentUrl.includes('/help-orders')}
          >
            Pedidos de Auxílio
          </Link>
        </nav>
        <div>
          <strong>{userName}</strong>
          <button type="button" onClick={() => dispatch(signOut())}>
            Sair do sistema
          </button>
        </div>
      </Content>
    </Container>
  );
}
