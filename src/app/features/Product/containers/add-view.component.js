import { useInventory } from '../../../services/inventory.store';
import ItemFormComponents from '../components/item-form.component';
const AddViewComponent = () => {
  const { editItem, addItem } = useInventory();

  return (
    <>
      <ItemFormComponents
        addItem={addItem}
        edit={editItem}
      />
    </>
  );
};

export default AddViewComponent;
