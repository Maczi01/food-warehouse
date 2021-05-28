import React from 'react'
import AddItemForm from "../components/organisms/AddItemForm";
import AppContext from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";

const AddView = () => (
    <MainTemplate>
        <AppContext.Consumer>
            {(context) => (
                <AddItemForm addItem={context.addItem}
                             edit={context.editItem}

                />
            )}
        </AppContext.Consumer>
    </MainTemplate>
);

export default AddView;