import React, { useContext } from "react";
import { AppContext } from "../../../context/context";

import ItemFormComponents from "./components/item-form.component";
const AddView = () => {
  const { editItem, addItem } = useContext(AppContext);
  return (
    <>
      <ItemFormComponents addItem={addItem} edit={editItem} />
    </>
  );
};

export default AddView;
