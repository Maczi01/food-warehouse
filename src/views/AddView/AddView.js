import React from 'react'
import Form from "../../components/Form/Form";
import AppContext from "../../context/context";

const AddView = () => (
    <AppContext.Consumer>
        {(context) => (
            <Form addItem={context.addItem}/>
        )}
    </AppContext.Consumer>
);

export default AddView;