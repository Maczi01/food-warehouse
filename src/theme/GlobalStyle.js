import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    background-color: ${props => props.theme.backgroundColor};
  }
`;

export default GlobalStyle;
