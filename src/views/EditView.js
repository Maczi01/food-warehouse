import React from 'react';
import List from '../components/organisms/List'
import AppContext from "../context/context";
import AddItemForm from "../components/organisms/AddItemForm";
import EditItemForm from "../components/organisms/EditItemForm";

const EditView = ({match}) => {
    const selectedId = match.params.id;

    return (
        <AppContext.Consumer>
            {context => (
                <EditItemForm
                    item={context.foodList.filter(item => item.id === selectedId)[0]}
                    editItem={context.editItem}
                />
            )}
        </AppContext.Consumer>
    )
}

export default EditView;