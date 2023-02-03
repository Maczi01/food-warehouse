import PropTypes from "prop-types";
import React from 'react';

import MainTemplate from '../../../layouts/default-layout/DefaultLayout';
import { useInventory } from '../../../services/inventory.store';
import EditItemFormComponents from '../components/edit-item-form.component';

const EditViewComponent = ({ match }) => {
  const selectedId = match.params.id;
  const { foodList, editItem } = useInventory();
  const item = foodList.find((item) => item.id === selectedId);

  return (
    <MainTemplate>
      <EditItemFormComponents
        item={item}
        editItem={editItem}
      />
    </MainTemplate>
  );
};

EditViewComponent.propTypes = {
    match: PropTypes.object,
};

export default EditViewComponent;
