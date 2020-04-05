import React from 'react';
import List from "../../components/List/List";
import AppContext from "../../context/context";
import ListItem from "../../components/List/ListItem";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListView = () => (
    <>
        <h1>Lista zakupów</h1>
        <AppContext.Consumer>
            {(context) => {

                const array = context.foodList.filter((item) => (
                    item.currentQuantity < item.minimalQuantity
                ));
                if (array.length > 0) {
                    context.goToShop = true;
                }
                return (
                    array.map(item =>
                        <ListItem {...item} key={item.id}/>)
                )

            }}
        </AppContext.Consumer>
    </>
);

export default ListView;

