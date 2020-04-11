import styled from 'styled-components';

export const Container = styled.div`
  height: 448px;
  background: #fff;
  border-radius: 4px;

  padding: 30px 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 20px;
  }

  form {
    width: 100%;

    display: flex;
    flex-direction: column;

    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;

    input {
      margin: 10px 0;
      font-size: 16px;

      height: 45px;
      width: 300px;
      padding-left: 15px;

      border-radius: 4px;
      border: 1px solid #ddd;
      background: #fff;
    }

    button {
      margin-top: 30px;
    }
  }
`;
