import React, {useContext} from 'react'
import AddItemForm from "../components/organisms/AddItemForm";
import {AppContext} from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";

const AddView = () => {
    const {editItem, addItem} = useContext(AppContext);
    return (
        <MainTemplate>
            <AddItemForm addItem={addItem}
                         edit={editItem}

            />
            )
        </MainTemplate>
    )
};

export default AddView;