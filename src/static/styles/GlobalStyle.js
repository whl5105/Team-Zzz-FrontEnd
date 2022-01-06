import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

/* @font-face {
  font-family: 'Roboto', sans-serif;
  src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap')
    format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+0041-005A, U+0061-007A;
}

@font-face {
  font-family: 'Noto Sans KR', sans-serif;
  src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap')
    format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+AC00-U+D7A3;
} */

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700&family=Roboto:wght@100;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;  
    font-family: 'Noto Sans KR', sans-serif;
    /* font-family: 'Roboto', sans-serif; */
  }

  body {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
