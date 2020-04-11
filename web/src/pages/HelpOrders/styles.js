import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header``;

export const Table = styled.table``;

export const ModalAnswer = styled.div`
  width: 450px;
  min-height: 400px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 20px;
  }

  textarea {
    border-color: #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #999;
    padding: 10px;
  }

  button {
    border: none;
    background: #ee4d64;
    border-radius: 4px;
    padding: 5px 10px;
    height: 45px;

    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }
`;
