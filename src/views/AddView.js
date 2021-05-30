import React, {useContext} from 'react'
import {AppContext} from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";
import AddItemForm2 from "../components/organisms/AddItemForm2";

const AddView = () => {
    const {editItem, addItem} = useContext(AppContext);
    return (
        <MainTemplate>
            <AddItemForm2 addItem={addItem}
                         edit={editItem}

            />
            )
        </MainTemplate>
    )
};

export default AddView;