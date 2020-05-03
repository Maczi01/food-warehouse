import React from 'react'
import AddItemForm from "../components/organisms/AddItemForm";
import AppContext from "../context/context";

const AddView = () => (
    <AppContext.Consumer>
        {(context) => (
            <AddItemForm addItem={context.addItem}
                            checkName={context.checkIfAlreadyExist}
            />
        )}
    </AppContext.Consumer>
);

export default AddView;