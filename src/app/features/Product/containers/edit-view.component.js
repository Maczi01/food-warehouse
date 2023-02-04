import { useParams } from 'react-router-dom';

import MainTemplate from '../../../layouts/default-layout/default-layout.component';
import { useInventory } from '../../../services/inventory.store';
import EditItemFormComponents from '../components/edit-item-form.component';

const EditViewComponent = () => {
  const { id: selectedId } = useParams();
  const { foodList, editItem } = useInventory();
  const item = foodList.find((item) => item.id === selectedId);

  return (
    <MainTemplate>
      <EditItemFormComponents item={item} editItem={editItem} />
    </MainTemplate>
  );
};

export default EditViewComponent;
