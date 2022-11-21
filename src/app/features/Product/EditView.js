import React, { useContext } from "react";
import { AppContext } from "../../../context/context";
import EditItemFormComponents from "./components/edit-item-form.component";
import MainTemplate from "../../layouts/default-layout/DefaultLayout";

const EditView = ({ match }) => {
  const selectedId = match.params.id;
  const { foodList, editItem } = useContext(AppContext);
  const item = foodList.find((item) => item.id === selectedId);

  return (
    <MainTemplate>
      <EditItemFormComponents item={item} editItem={editItem} />
    </MainTemplate>
  );
};

export default EditView;
