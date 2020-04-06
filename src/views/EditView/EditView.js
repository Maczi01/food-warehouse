import React from 'react';
import List from '../../components/List/List'
import AppContext from "../../context/context";

const EditView = () => (
    <AppContext.Consumer>
        {(context) => (
            <List items={context.foodList}
                  deleteItem={context.deleteItem}
                  decreaseQuantity={context.decreaseQuantity}
                  increaseQuantity={context.increaseQuantity}
                  editName={context.editName}
                  toEdit={true}
                  shop={true}
            />
        )}
    </AppContext.Consumer>
)

export default EditView;