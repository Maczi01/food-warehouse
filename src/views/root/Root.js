import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./index.css";
import MainView from '../MainView/MainView'
import ListView from "../ListView/ListView";
import AddView from "../AddView/AddView";
import SettingsView from "../SettingsView/Settings";
import AppContext from "../../context/context";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import {ThemeProvider} from "styled-components";
import {theme} from '../../theme/theme'
// import firebase from "../../firebase/firebase";
import GlobalStyle from "../../theme/GlobalStyle";
// import * as firebase from "firebase";
import {db} from '../../firebase/firebase'
import {routes} from '../../components/routes/routes'
import LoginView from "../LoginView/LoginView";
import {AuthProvider} from "../../firebase/Auth";
import PrivateRoute from "../../firebase/PrivateRoute";

const Root = () => {


    const [foodList, setFoodList] = React.useState([]);
    React.useEffect(() => {
        // const db = firebase.firestore();
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
        // const db = firebase.firestore();
        db.collection("foodList").add(newItem);
    };

    const increaseQuantity = (item) => {
        // const db = firebase.firestore();
        // const increment = firebase.firestore.FieldValue.increment(+1)
        db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
    };

    const decreaseQuantity = (item) => {
        // const db = firebase.firestore()
        // const decreament = firebase.firestore.FieldValue.increment(-1)
        db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
    };

    const editName = (item) => {
        const result = prompt('Change the name');
        // const db = firebase.firestore();
        db.collection("foodList").doc(item.id).update({name: item.name = result})
        // const db = firebase.firestore();
        // db.collection("foodList").doc(id).set({
        //     ...foodList.map(item =>
        //         item.id === id ? {item.name = result} : {item})
        // })
    }

    // componentDidMount() {
    //     const localStorageState = JSON.parse(localStorage.getItem("list"));
    //     localStorageState && this.setState(localStorageState);
    // }
    const handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        // const db = firebase.firestore();
        db.collection("foodList").doc(id).delete()
    }
    const contextElements = {
        foodList: foodList,
        deleteItem: handleDelete,
        addItem: addItem,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        editName: editName,
    };
    return (
        <AuthProvider>
            <BrowserRouter>
                <GlobalStyle/>
                <ThemeProvider theme={theme}>
                    <AppContext.Provider value={contextElements}>
                        <Switch>
                        <Header/>
                            <PrivateRoute exact path={routes.home} component={MainView}/>
                            <PrivateRoute path={routes.list} component={ListView}/>
                            <PrivateRoute path={routes.add} component={AddView}/>
                            <PrivateRoute path={routes.settings} component={SettingsView}/>
                            <Route path={routes.login} component={LoginView}/>
                        </Switch>
                    </AppContext.Provider>
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    );

}

export default Root;
