import React from 'react';
import ListItem from "./ListItem";
import styles from './List.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const List = ({items, shop, deleteItem, decreaseQuantity, increaseQuantity, editName, toEdit}) => {
    return (
        <ul className={styles.wrapper}>
            {items.map(item => (
                <ListItem {...item}
                          key={item.id}
                          deleteItem={() => deleteItem(item.id)}
                          toEdit={toEdit}
                          shop={shop}
                          decreaseQuantity={() => decreaseQuantity(item.id)}
                          increaseQuantity={() => increaseQuantity(item.id)}
                          editName={() => editName(item.id)
                          }/>
            ))}
        </ul>)
};
export default List;
