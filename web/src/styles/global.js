import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    overflow: auto;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-seriff;
  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .container{
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px 10px;
  }

  .title{
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }


  .btn{
    background: #EE4D64;
    color: #fff;

    font-size: 16px;
    font-weight: bold;

    border-radius: 4px;
    padding: 15px;


    transition: background .2s;
    &:hover{
      background: ${darken(0.3, '#EE4D64')}
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions{
      display: flex;
      align-items: center;

      button, a {
        svg {
          margin-right: 5px;
        }

        display: flex;
        align-items: center;

        margin-right: 15px;
        padding: 5px 10px;
        border: 0;
        border-radius: 4px;
        height: 36px;

        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        color: #fff;

        &.primary{
          background: #ee4d64;
        }

        &.secondary{
          background: #979797;
        }
      }

      input {
        height: 36px;
        padding: 5px 20px;
        border: 0.5px solid #ddd;
        border-radius: 4px;

        font-size: 12px;
        color: #999;
      }
    }
  }

.table{

  width: 980px;

  margin-top: 20px;
  padding: 30px;

  background: #fff;
  text-align: left;
  border-radius: 4px;

  thead {
    font-size: 16px;
    font-weight: bold;
    color: #444;
  }

  tbody {
    font-size: 16px;
    color: #666;

    td {
      padding: 15px 0;
      border-bottom: 1px solid #eee;

      &:nth-child(3) {
        text-align: center;
      }

      div {
        display: flex;
        justify-content: flex-end;

        button {
          border: 0;
          background: none;

          margin-left: 15px;

          &.edit {
            color: #4d85ee;
          }

          &.delete {
            color: #de3b3b;
          }
        }
      }
    }
}

`;
