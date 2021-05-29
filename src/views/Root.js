import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "../components/molecules/Header";
import FilterView from './MainView'
import ShoppingListView from "./ShoppingListView";
import AddView from "./AddView";
import SettingsView from "./SettingsView";
// import AppContext from "../context/context";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import {ThemeProvider} from "styled-components";
import {lightTheme, nightTheme} from '../theme/theme'
import GlobalStyle from "../theme/GlobalStyle";
import {db} from '../firebase/firebaseConfig'
import {routes} from '../routes/routes'
import LoginView from "./LoginView";
import {AuthProvider} from "../providers/Auth";
import PrivateRoute from "../routes/PrivateRoute";
import RegisterView from "./RegisterView";
import English from '../languages/en'
import Polish from '../languages/pl'
import {IntlProvider} from "react-intl";
import EditView from "./EditView";
import MainView from "./FilterView";
import {Switch} from "react-router";
import AppProvider, {AppContext} from "../context/context";

const Root = () => {

    // const [theme, setTheme] = useState('light');

    // const toggleTheme = (e) => {
    //     if (e.target.value === 'on') {
    //         setTheme('dark');
    //     }
    //     if (e.target.value === 'off') {
    //         setTheme('light');
    //     }
    // }

    // const {theme, locale, language} = useContext(AppContext);

    return (
        <AuthProvider>
            <AppProvider>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path={routes.home} component={MainView}/>
                        <PrivateRoute path={`${routes.filter}${routes.parameter}`} component={FilterView}/>
                        <PrivateRoute path={routes.list} component={ShoppingListView}/>
                        <PrivateRoute path={routes.add} component={AddView}/>
                        <PrivateRoute path={routes.edit} component={EditView}/>
                        <PrivateRoute path={routes.settings} component={SettingsView}/>
                        <Route path={routes.login} component={LoginView}/>
                        <Route path={routes.register} component={RegisterView}/>
                    </Switch>
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    );
}

export default Root;

