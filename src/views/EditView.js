import React, {useContext} from 'react';
import {AppContext} from "../context/context";
import EditItemForm2 from "../components/organisms/EditItemForm2";
import MainTemplate from "../components/templates/MainTemplate";

const EditView = ({match}) => {
    const selectedId = match.params.id;
    const {foodList, editItem} = useContext(AppContext);
    const item = foodList.filter(item => item.id === selectedId)[0];

    return (
        <MainTemplate>
            <EditItemForm2
                item={item}
                editItem={editItem}
            />
        </MainTemplate>
    )
};

export default EditView;