import React from 'react';
import AppContext from "../../context/context";
import ListItem from "../../components/List/ListItem";
import 'react-toastify/dist/ReactToastify.css';


const ListView = () => (
    <>
        <h1>Lista zakupów</h1>
        <AppContext.Consumer>
            {(context) => (
                context.foodList.filter((item) => (
                    item.currentQuantity < item.minimalQuantity
                )).map(item =>
                    <ListItem {...item} key={item.id}/>))}
        </AppContext.Consumer>
    </>
);

export default ListView;

