import React, {useContext} from 'react';
import {AppContext} from "../context/context";
import EditItemForm from "../components/organisms/EditItemForm";
import MainTemplate from "../components/templates/MainTemplate";

const EditView = ({match}) => {
    const selectedId = match.params.id;
    const {foodList, editItem} = useContext(AppContext);
    const item = foodList.filter(item => item.id === selectedId)[0];

    return (
        <MainTemplate>
            <EditItemForm
                item={item}
                editItem={editItem}
            />
        </MainTemplate>
    )
};

export default EditView;