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
import {v4 as uuidv4} from 'uuid';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Root extends React.Component {

    checkList = () => {
        if (this.state.goToShop) {
            console.log("papaaosndaiuhdia")
        }
    }

    state = {
        foodList: [
            {id: "sdfgh", name: "czosnek", currentQuantity: 2, minimalQuantity: 3, maximalQuantity: 4,},
            {id: "tttr2", name: "kartofle", currentQuantity: 5, minimalQuantity: 3, maximalQuantity: 5,},
            {id: "awesfd", name: "jajka", currentQuantity: 2, minimalQuantity: 1, maximalQuantity: 4,},
            {id: "qwer", name: "mleko", currentQuantity: 0, minimalQuantity: 1, maximalQuantity: 4,},
        ],
        goToshop: false,
        not: this.checkList,
    };


    notify = () => {
        toast.success("Dodano", {
            position: toast.POSITION.TOP_CENTER
        });
    }


    addItem = (e, newItem) => {
        e.preventDefault();
        newItem.id = uuidv4();
        this.state.foodList.push(newItem)
    };

    handleDelete = id => {
        const res = window.confirm('Do you want to delete this item?');
        if (res) {
            const filteredItems = this.state.foodList.filter(item => item.id !== id);
            this.setState({
                foodList: filteredItems
            })
        }
    }

    increaseQuantity = (id) => {
        const filteredItems = this.state.foodList.filter(item => item.id !== id);
        const itemToIncrease = this.state.foodList.find(item => item.id === id);
        itemToIncrease.currentQuantity++;
        filteredItems.push(itemToIncrease)
        this.setState({
            foodList: filteredItems,
        })
    }

    decreaseQuantity = (id) => {
        const filteredItems = this.state.foodList.filter(item => item.id !== id);
        const itemToIncrease = this.state.foodList.find(item => item.id === id);
        itemToIncrease.currentQuantity--;
        filteredItems.push(itemToIncrease)
        this.setState({
            foodList: filteredItems,
        })
    }

    editName = (id) => {
        const result = prompt('Change the name');
        console.log(result)
        const filteredItems = this.state.foodList.filter(item => item.id !== id);
        const itemToIncrease = this.state.foodList.find(item => item.id === id);
        itemToIncrease.name = result;
        filteredItems.push(itemToIncrease)
        this.setState({
            foodList: filteredItems,
        })
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
            </BrowserRouter>
        );
    }
}

export default Root;
