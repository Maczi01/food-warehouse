import { useParams } from 'react-router-dom';

import { useInventory } from '../../../services/inventory.store';
import EditItemFormComponents from '../components/edit-item-form.component';

const EditViewComponent = () => {
  const { id: selectedId } = useParams();
  const { state, editItem } = useInventory();
  const item = state.inventory.find((item) => item.id === selectedId);

  return <EditItemFormComponents item={item} editItem={editItem} />;
};

export default EditViewComponent;
