import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import { HttpClientAdapter, auth } from './firebase.config';
import { availableLanguages } from './language';
import { ThemeProvider } from './shared/theme/theme';
import { AuthProvider } from './shared/utills/Auth';
import { TranslationProvider } from './shared/utills/Translation';
import { initializeHttpClient } from './shared/utills/http-client';

initializeHttpClient(new HttpClientAdapter());

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider auth={auth}>
        <TranslationProvider
          defaultLanguage={'en'}
          languages={availableLanguages}
        >
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </TranslationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
