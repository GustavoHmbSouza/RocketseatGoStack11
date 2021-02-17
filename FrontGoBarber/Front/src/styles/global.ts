import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background-color: #312E38;
        color:#fff;
        -webkit-font-smooth: antialiased;
    }

    body, input, button{
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
    }

    h1, h2, h3, h4, h5, strong{
        font-weight: 500;
    }

    button{
        cursor: pointer;
    }
`;
