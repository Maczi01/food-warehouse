import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./index.css";
import MainView from '../MainView/MainView'
import ListView from "../ListView/ListView";
import AddView from "../AddView/AddView";
import EditView from "../EditView/EditView";
import SettingsView from "../SettingsView/Settings";
import AppContext from "../../context/context";
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import {ThemeProvider} from "styled-components";
import {theme} from '../../theme/theme'

class Root extends React.Component {
    state = {
        foodList: [
            {
                name: "kawiarka",
                currentQuantity: 1,
                category: "pieczywo",
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },
            {
                name: "babka piaskowa",
                category: "slodycze i przekąski",
                currentQuantity: 2,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },
            {
                name: "czekolada",
                category: "slodycze i przekąski",
                currentQuantity: 3,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },
            {
                name: "polędwica",
                category: "slodycze i przekąski",
                currentQuantity: 4,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "pistacja",
                category: "slodycze i przekąski",
                currentQuantity: 5,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "pistacja",
                category: "slodycze i przekąski",
                currentQuantity: 6,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "chipsy",
                category: "slodycze i przekąski",
                currentQuantity: 7,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "draże",
                category: "slodycze i przekąski",
                currentQuantity: 8,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "draże",
                category: "slodycze i przekąski",
                currentQuantity: 9,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "draże",
                category: "slodycze i przekąski",
                currentQuantity: 10,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },{
                name: "draże",
                category: "slodycze i przekąski",
                currentQuantity: 9,
                maximalQuantity: 10,
                minimalQuantity: 5,
                toEdit: false,
            },
        ],
    };

    addItem = (e, newItem) => {
        // e.preventDefault();
        this.setState(prevState => {
            newItem.id = uuidv4();
            console.log(newItem)
            const newState = {
                foodList: [...prevState.foodList, newItem]
            };
            localStorage.setItem("list", JSON.stringify(newState));

            return newState
        });
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
                            <Route path="/edit" component={EditView}/>
                            <Route path="/settings" component={SettingsView}/>
                        </Switch>
                    </AppContext.Provider>
                </ThemeProvider>
            </BrowserRouter>
        );
    }
}

export default Root;
