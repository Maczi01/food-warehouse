import React from 'react';
import styles from './ListItem.module.scss'
import Bar from './Bar'

const ListItem = ({name, id, currentQuantity, decreaseQuantity, increaseQuantity, deleteItem, editName, toEdit}) => (
    <li className={styles.wrapper}>
        <h3>{name}</h3>
        <h6>{currentQuantity}</h6>
        <Bar/>
        <button onClick={deleteItem}>Usun</button>

        {toEdit ? (
            <>
                <button onClick={editName}>Edytuj</button>
                <button onClick={decreaseQuantity}> -</button>
                <button onClick={increaseQuantity}> +</button>
            </>
        ) : null}

    </li>
);

export default ListItem;