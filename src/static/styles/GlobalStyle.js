import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    font-weight: 500;
    font-family: NotoSansKR, "Roboto",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    box-sizing: border-box;
    
  }
  button,img{
    cursor:pointer;
  }
  
`;

export default GlobalStyle;
