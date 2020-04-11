import styled from 'styled-components';

export const Container = styled.div`
  form {
    margin-top: 20px;
    padding: 30px;
    background: #fff;

    display: flex;
    flex-direction: column;

    color: #444;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;

    input {
      margin: 10px 0;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }

      height: 45px;
      width: 300px;
      padding-left: 15px;

      border-radius: 4px;
      border: 1px solid #ddd;
      background: #fff;

      &.col-md-12 {
        width: 100%;
      }

      &.col-md-4 {
        width: 33.33%;
      }
    }

    > div {
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const Header = styled.header``;
