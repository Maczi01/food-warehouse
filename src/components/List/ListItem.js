import React from 'react';
import styles from './ListItem.module.scss'

const ListItem = ({name, id, currentQuantity, maximalQuantity, decreaseQuantity, increaseQuantity, deleteItem, editName, toEdit}) => (
    <li className={styles.wrapper}>
        <h3>{name}</h3>
        <span>{`${currentQuantity} / ${maximalQuantity} szt`}</span>
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