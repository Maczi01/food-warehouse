import React, {useContext} from 'react'
import {AppContext} from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";
import ItemForm from "../components/organisms/ItemForm";

const AddView = () => {
    const {editItem, addItem} = useContext(AppContext);
    return (
        <MainTemplate>
            <ItemForm
                addItem={addItem}
                edit={editItem}
            />
        </MainTemplate>
    )
};

export default AddView;