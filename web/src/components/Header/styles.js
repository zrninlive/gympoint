import styled from 'styled-components';
import { Link as Anchor } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
`;

export const Content = styled.div`
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1200px;
  height: 64px;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 40px;
      padding-right: 40px;
      border-right: 1px solid #ddd;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    strong {
      display: block;

      color: #666;
      font-size: 14px;
      font-weight: bold;
    }

    button {
      margin-top: 5px;
      border: 0;
      background: none;

      color: #de3b3b;
      text-align: right;
    }
  }
`;

export const Link = styled(Anchor)`
  font-size: 15px;
  font-weight: bold;

  text-transform: uppercase;
  color: ${props => (props.active ? '#444' : '#999')};

  padding-left: 15px;

  transition: hover 0.2s;

  &:hover {
    color: #ee4d64;
  }
`;
