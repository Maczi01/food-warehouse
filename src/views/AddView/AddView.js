import React from 'react'
import AddItemForm from "../../components/Form/AddItemForm";
import AppContext from "../../context/context";

const AddView = () => (
    <AppContext.Consumer>
        {(context) => (
            <AddItemForm addItem={context.addItem}/>
        )}
    </AppContext.Consumer>
);

export default AddView;