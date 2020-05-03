import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "../components/molecules/Header";
import MainView from './MainView'
import ListView from "./ListView";
import AddView from "./AddView";
import SettingsView from "./Settings";
import AppContext from "../context/context";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import {ThemeProvider} from "styled-components";
import {lightTheme, nightTheme} from '../theme/theme'
import GlobalStyle from "../theme/GlobalStyle";
import {db, toCheck} from '../firebase/firebase'
import {routes} from '../routes/routes'
import LoginView from "./LoginView";
import {AuthProvider} from "../providers/Auth";
import PrivateRoute from "../routes/PrivateRoute";
import RegisterView from "./RegisterView";
import English from '../languages/en'
import Polish from '../languages/pl'
import {IntlProvider} from "react-intl";


const Root = () => {

    const [foodList, setFoodList] = React.useState([]);
    const [theme, setTheme] = useState('light');
    const [locale, setLocale] = useState('en');
    const [language, setLanguage] = useState(English);

    function changeLanguage(language) {
        setLocale(language);
        switch (language) {
            case('en'):
                setLanguage(English)
                break;
            default:
                setLanguage(Polish)
        }
    }


    const toggleTheme = (e) => {
        if (e.target.value === 'on') {
            setTheme('dark');
        }
        if (e.target.value === 'off') {
            setTheme('light');
        }
    }

    const handleChange = e => {
        changeLanguage(e.target.value);
    };


    React.useEffect(() => {
        const unSubscribe = db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = []
                snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
                setFoodList(foodListData)
            }
        );
        return unSubscribe;
    }, []);

    const addItem = (newItem) => {
        newItem.id = uuidv4();
        db.collection("foodList").add(newItem);
    };

    const increaseQuantity = (item) => {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
        }
    };

    const decreaseQuantity = (item) => {
        if (item.currentQuantity > 0) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
        }
    };

    const editName = (item) => {
        const result = prompt('Change the name');
        db.collection("foodList").doc(item.id).update({name: item.name = result})
    }

    const handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        db.collection("foodList").doc(id).delete()
    };


    const contextElements = {
        foodList: foodList,
        deleteItem: handleDelete,
        addItem: addItem,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        editName: editName,
        toggleTheme: toggleTheme,
        darkMode: theme,
        handleChange: handleChange,
        locale: locale,
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <IntlProvider locale={locale} messages={language}>
                    <ThemeProvider theme={theme === 'light' ? lightTheme : nightTheme}>
                        <GlobalStyle backgroundColor={theme.backgroundColor}/>
                        <AppContext.Provider value={contextElements}>
                            <Header/>
                            <Switch>
                                <PrivateRoute exact path={routes.home} component={MainView}/>
                                <PrivateRoute path={routes.list} component={ListView}/>
                                <PrivateRoute path={routes.add} component={AddView}/>
                                <PrivateRoute path={routes.settings} component={SettingsView}/>
                                <Route path={routes.login} component={LoginView}/>
                                <Route path={routes.register} component={RegisterView}/>
                            </Switch>
                        </AppContext.Provider>
                    </ThemeProvider>
                </IntlProvider>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Root;

