import React, {useEffect, useState} from 'react';
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
import firebase from "../../firebase/firebase";

// class Root extends React.Component {
// state = {
//     foodList: [],
// };
const Root = () => {

    const [foodList, setFoodList] = React.useState([]);

    React.useEffect(() => {
        const db = firebase.firestore();
        const unSubscribe = db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = []
                snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
                setFoodList(foodListData)
            }
        );
        return unSubscribe;
    }, []);


    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const db = firebase.firestore();
    //         const data = await db.collection("foodList").get();
    //         setFoodList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    //     };
    //     fetchData();
    // }, []);

    const addItem = (newItem) => {
        newItem.id = uuidv4();
        newItem.category = "Pieczywo";
        const db = firebase.firestore();
        db.collection("foodList").add(newItem);
    };

    const increaseQuantity = (item) => {
        const db = firebase.firestore()
        db.collection("foodList").doc(item.id).update({currentQuantity: item.currentQuantity++});
    };

    const decreaseQuantity = (item) => {
        const db = firebase.firestore();
        db.collection("foodList").doc(item.id).update({currentQuantity: item.currentQuantity--})
    };

    const editName = (item) => {
        const result = prompt('Change the name');
        const db = firebase.firestore();
        db.collection("foodList").doc(item.id).update({name: item.name = result})
        // const db = firebase.firestore();
        // db.collection("foodList").doc(id).set({
        //     ...foodList.map(item =>
        //         item.id === id ? {item.name = result} : {item})
        // })


        // const itemToIncrease = this.state.foodList.find(item => item.id === id);
        // itemToIncrease.name = result;
        // this.setState(prevState => {
        //     const newState = {
        //         foodList: [
        //             ...prevState.foodList.map(item =>
        //                 item.id === id ? itemToIncrease : item)]
        //     };
        //     localStorage.setItem("list", JSON.stringify(newState));
        //
        //     return newState
        // });
    }

    // componentDidMount() {
    //     const localStorageState = JSON.parse(localStorage.getItem("list"));
    //     localStorageState && this.setState(localStorageState);
    // }
    const handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        const db = firebase.firestore();
        db.collection("foodList").doc(id).delete()
    }
    // render() {
    const contextElements = {
        // ...this.state,
        foodList: foodList,
        deleteItem: handleDelete,
        addItem: addItem,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
        editName: editName,
    };
    // }
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AppContext.Provider value={contextElements}>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={MainView}/>
                        <Route path="/list" component={ListView}/>
                        <Route path="/add" component={AddView}/>
                        {/*<Route path="/edit" component={EditView}/>*/}
                        <Route path="/settings" component={SettingsView}/>
                    </Switch>
                </AppContext.Provider>
            </ThemeProvider>
        </BrowserRouter>
    );

}

export default Root;
