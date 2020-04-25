import React from 'react';
import AppContext from "../../context/context";
import ListItem from "../../components/List/ListItem";
import 'react-toastify/dist/ReactToastify.css';
import bag from '../../asstets/img/bag.svg';


const ListView = () => (
    <>
        <h1>Lista zakupów</h1>
        <img src={bag} alt="shoping bag"/>
        <AppContext.Consumer>
            {(context) => (
                context.foodList.filter((item) => (
                    item.currentQuantity < item.minimalQuantity
                )).map(item =>
                    <ListItem {...item}
                              key={item.id}
                              shop={false}
                    />)
            )}
        </AppContext.Consumer>
    </>
);

export default ListView;

