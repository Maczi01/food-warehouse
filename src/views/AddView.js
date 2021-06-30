import React, {useContext} from 'react'
import {AppContext} from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";
import FormItem from "../components/organisms/FormItem";

const AddView = () => {
    const {editItem, addItem} = useContext(AppContext);
    return (
        <MainTemplate>
            {/*<ItemForm*/}
            <FormItem
                addItem={addItem}
                edit={editItem}
            />
        </MainTemplate>
    )
};

export default AddView;