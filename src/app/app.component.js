import { BrowserRouter } from 'react-router-dom';

import { HttpClientAdapter, auth } from './firebase.config';
import { availableLanguages, defaultLanguage } from './language';
import Routes from './routes.component';
import { ThemeProvider } from './shared/theme/theme';
import { AuthProvider } from './shared/utils/auth';
import { initializeHttpClient } from './shared/utils/http-client';
import { ToastContainer, toast } from './shared/utils/toast';
import { TranslationProvider } from './shared/utils/translation';

initializeHttpClient(new HttpClientAdapter());

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider auth={auth}>
        <TranslationProvider defaultLanguage={defaultLanguage} languages={availableLanguages}>
          <ThemeProvider>
            <Routes />
            <ToastContainer autoClose={2500} position={toast.POSITION.TOP_CENTER} />
          </ThemeProvider>
        </TranslationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
