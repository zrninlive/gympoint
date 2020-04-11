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

    select,
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

      &:disabled {
        background: #ddd;
      }
    }

    > .input-flex {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;

        padding-left: 5px;
      }
    }
  }
`;

export const Header = styled.header``;
