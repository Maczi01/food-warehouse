import React from 'react'
import AddItemForm from "../components/organisms/AddItemForm";
import AppContext from "../context/context";
import Modal from "../components/molecules/Modal";

const AddView = () => (
    <AppContext.Consumer>
        {(context) => (
            <AddItemForm addItem={context.addItem}
                         edit={context.editItem}

            />
        )}
    </AppContext.Consumer>
);

export default AddView;