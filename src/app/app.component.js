import { BrowserRouter } from 'react-router-dom';

import { HttpClientAdapter, auth } from './firebase.config';
import { availableLanguages } from './language';
import Routes from './routes.component';
import { ThemeProvider } from './shared/theme/theme';
import { AuthProvider } from './shared/utills/auth';
import { initializeHttpClient } from './shared/utills/http-client';
import { TranslationProvider } from './shared/utills/translation';

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
