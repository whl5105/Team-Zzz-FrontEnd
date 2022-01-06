import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    font-family: 'Noto Sans KR', sans-serif;
    /* font-family: 'Roboto', sans-serif; */
  }

  body {
    box-sizing: border-box;
  }
  button,img{
    cursor:pointer;
  }
  
`;

export default GlobalStyle;
