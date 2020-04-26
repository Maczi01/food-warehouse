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

class Root extends React.Component {
    state = {
        foodList: [],
    };

    addItem = (e, newItem) => {
        // e.preventDefault();
        this.setState(prevState => {
            newItem.id = uuidv4();
            newItem.category = "Pieczywo";
            console.log(newItem)
            const newState = {
                foodList: [...prevState.foodList, newItem]
            };
            localStorage.setItem("list", JSON.stringify(newState));
            return newState
        });
        console.log(this.state)
    };

    handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        if (res) {
            this.setState(prevState => {
                const newState = {
                    foodList: [
                        ...prevState.foodList.filter(item => item.id !== id)]
                };
                localStorage.setItem("list", JSON.stringify(newState));
                return newState
            });
        }
    }

    increaseQuantity = (id) => {
        const itemDecrease = this.state.foodList.find(item => item.id === id);
        itemDecrease.currentQuantity++;
        this.setState(prevState => {
            const newState = {
                foodList: [
                    ...prevState.foodList.map(item =>
                        item.id === id ? itemDecrease : item)]
            };
            localStorage.setItem("list", JSON.stringify(newState));

            return newState
        });
    }

    decreaseQuantity = (id) => {
        const itemDecrease = this.state.foodList.find(item => item.id === id);
        itemDecrease.currentQuantity--;
        this.setState(prevState => {
            const newState = {
                foodList: [
                    ...prevState.foodList.map(item =>
                        item.id === id ? itemDecrease : item)]
            };
            localStorage.setItem("list", JSON.stringify(newState));

            return newState
        });
    }

    editName = (id) => {
        const result = prompt('Change the name');
        const itemToIncrease = this.state.foodList.find(item => item.id === id);
        itemToIncrease.name = result;
        this.setState(prevState => {
            const newState = {
                foodList: [
                    ...prevState.foodList.map(item =>
                        item.id === id ? itemToIncrease : item)]
            };
            localStorage.setItem("list", JSON.stringify(newState));

            return newState
        });
    }

    componentDidMount() {
        const localStorageState = JSON.parse(localStorage.getItem("list"));
        localStorageState && this.setState(localStorageState);
    }

    render() {
        const contextElements = {
            ...this.state,
            deleteItem: this.handleDelete,
            addItem: this.addItem,
            increaseQuantity: this.increaseQuantity,
            decreaseQuantity: this.decreaseQuantity,
            editName: this.editName,
        };

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
}

export default Root;
