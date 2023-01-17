import React from "react";
import EditItemFormComponents from "../components/edit-item-form.component";
import MainTemplate from "../../../layouts/default-layout/DefaultLayout";
import {useInventory} from '../../../services/inventory.store';

const EditViewComponent = ({ match }) => {
  const selectedId = match.params.id;
  const { foodList, editItem } = useInventory();
  const item = foodList.find((item) => item.id === selectedId);

  return (
    <MainTemplate>
      <EditItemFormComponents item={item} editItem={editItem} />
    </MainTemplate>
  );
};

export default EditViewComponent;
