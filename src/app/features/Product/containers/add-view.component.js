import React from "react";

import ItemFormComponents from "../components/item-form.component";
import {useInventory} from '../../../services/inventory.store';
const AddViewComponent = () => {

  const { editItem, addItem } = useInventory();
  return (
    <>
      <ItemFormComponents addItem={addItem} edit={editItem} />
    </>
  );
};

export default AddViewComponent;
