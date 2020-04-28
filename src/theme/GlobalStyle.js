import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,600i&display=swap');
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    overflow-y: scroll;
  }

  body {
    font-family: 'Fira Sans', sans-serif;
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
