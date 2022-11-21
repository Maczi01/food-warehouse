import React from 'react';
import {AuthProvider} from './shared/utills/Auth';
import {BrowserRouter} from 'react-router-dom';

import Routes from './Routes';
import AppProvider from '../context/context';
import {auth, db} from '../context/firebaseApi';
import {ThemeProvider} from './shared/theme/theme';
import {TranslationProvider} from './shared/utills/Translation';
import {availableLanguages} from './language';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider auth={auth} db={db}>
                <AppProvider>
                    <TranslationProvider defaultLanguage="en" languages={availableLanguages}>
                        <ThemeProvider>
                            <Routes/>
                        </ThemeProvider>
                    </TranslationProvider>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
