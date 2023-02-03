import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from './Routes';
import {AuthProvider} from './shared/utills/Auth';
import {ThemeProvider} from './shared/theme/theme';
import {TranslationProvider} from './shared/utills/Translation';
import {availableLanguages} from './language';
import {initializeHttpClient} from './shared/utills/http-client';
import {auth, HttpClientAdapter} from './firebase.config';

initializeHttpClient(new HttpClientAdapter());

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider auth={auth}>
                <TranslationProvider defaultLanguage="en" languages={availableLanguages}>
                    <ThemeProvider>
                        <Routes/>
                    </ThemeProvider>
                </TranslationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
