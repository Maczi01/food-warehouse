import { createGlobalStyle } from 'styled-components';
import RedHatDisplay from 'assets/fonts/red-hat-display.woff';
import ReemKufi from 'assets/fonts/reem-kufi.woff';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Red Hat Display';
    src: local('Red Hat Display'),
    url(${RedHatDisplay}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Reem Kufi';
    src: local('Reem Kufi'),
    url(${ReemKufi}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

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
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
