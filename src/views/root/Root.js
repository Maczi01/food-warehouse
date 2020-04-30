import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "../../components/Header/Header";
// import "./index.css";
import MainView from '../MainView/MainView'
import ListView from "../ListView/ListView";
import AddView from "../AddView/AddView";
import SettingsView from "../SettingsView/Settings";
import AppContext from "../../context/context";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import {ThemeProvider} from "styled-components";
import {lightTheme, nightTheme} from '../../theme/theme'
import GlobalStyle from "../../theme/GlobalStyle";
import {db} from '../../firebase/firebase'
import {routes} from '../../components/routes/routes'
import LoginView from "../LoginView/LoginView";
import {AuthProvider} from "../../firebase/Auth";
import PrivateRoute from "../../firebase/PrivateRoute";
import RegisterView from "../RegisterView/RegisterView";

const Root = () => {

    const [foodList, setFoodList] = React.useState([]);
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
        db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
    };

    const decreaseQuantity = (item) => {
        db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
    };

    const editName = (item) => {
        const result = prompt('Change the name');
        db.collection("foodList").doc(item.id).update({name: item.name = result})
    }

    const handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        db.collection("foodList").doc(id).delete()
    };

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    const contextElements = {
        foodList: foodList,
        deleteItem: handleDelete,
        addItem: addItem,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        editName: editName,
        toggleTheme: toggleTheme,
        darkMode: theme
    };

    return (
        <AuthProvider>
            <BrowserRouter>
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
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Root;
