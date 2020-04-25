import React from 'react'
import Formm from "../../components/Form/Formm";
import AppContext from "../../context/context";

const AddView = () => (
    <AppContext.Consumer>
        {(context) => (
            <Formm addItem={context.addItem}/>
        )}
    </AppContext.Consumer>
);

export default AddView;