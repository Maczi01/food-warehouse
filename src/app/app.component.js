import { BrowserRouter } from 'react-router-dom';

import { HttpClientAdapter, auth } from './firebase.config';
import { availableLanguages, defaultLanguage } from './language';
import Routes from './routes.component';
import { ThemeProvider } from './shared/theme/theme';
import { AuthProvider } from './shared/utils/auth';
import { initializeHttpClient } from './shared/utils/http-client';
import { TranslationProvider } from './shared/utils/translation';

initializeHttpClient(new HttpClientAdapter());

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider auth={auth}>
        <TranslationProvider defaultLanguage={defaultLanguage} languages={availableLanguages}>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </TranslationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
