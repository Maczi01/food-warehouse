import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import bag from '../../../shared/assets/icons/bag.svg';
import generate from '../../../shared/assets/icons/generate.svg';
import plus from '../../../shared/assets/icons/plus.svg';
import remove from '../../../shared/assets/icons/remove.svg';
import { ButtonIcon } from '../../../shared/ui/Button';
import { useGetInventoriesQuery } from '../../Inventory/data-access/get-inventories.query';
import AddShopModalComponent from '../components/add-shop-modal.component';
import TableComponent from '../components/table.component';
import { useGetShoppingListQuery } from '../data-access/get-shopping-list.query';
import { useAddItemToShoppingListMutation } from '../data-access/mutations/add-shopping-list-item.mutation';
import { useClearShoppingListMutation } from '../data-access/mutations/clear-shopping-list.mutation';
import { useGenerateShoppingListMutation } from '../data-access/mutations/generate-shopping-list.mutation';
import { useToggleShoppingListItemMutation } from '../data-access/mutations/toggle-shopping-list-item.mutation';
import { ButtonContainer, Heading, Image, TableWrapper } from './shopping-list-view.styled';

const ShoppingListViewComponent = () => {
  const inventory = useGetInventoriesQuery();
  const generateShoppingList = useGenerateShoppingListMutation();
  const clearList = useClearShoppingListMutation();
  const toggleItem = useToggleShoppingListItemMutation();
  const addItem = useAddItemToShoppingListMutation();
  const shoppingList = useGetShoppingListQuery();
  const [modalOpen, setModalOpen] = useState(false);

  const handleGenerateShoppingList = useCallback(async () => {
    if (inventory.isSuccess) {
      await generateShoppingList.mutateAsync(inventory.data);
    }
  }, [generateShoppingList, inventory.data, inventory.isSuccess]);

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    await addItem.mutateAsync(data);
    hideModal();
  };
  const handleClearList = async () => {
    await clearList.mutateAsync();
  };
  const handleToggleItem = async (item) => {
    await toggleItem.mutateAsync(item);
  };

  useEffect(() => {
    inventory.refetch();
    shoppingList.refetch();
  }, []);

  return (
    <>
      <AddShopModalComponent open={modalOpen} onCancel={hideModal} onSubmit={handleSubmit} />
      <Heading>
        <FormattedMessage id="SHOPPING_LIST.HEADER" />
      </Heading>
      <TableWrapper>
        <Image src={bag} alt="shopping bag" />
        <ButtonContainer>
          <ButtonIcon onClick={showModal} icon={plus} data-testid="showModal" />
          <ButtonIcon onClick={handleGenerateShoppingList} icon={generate} data-testid="generateList" />
          <ButtonIcon onClick={handleClearList} icon={remove} data-testid="deleteList" />
        </ButtonContainer>
        {shoppingList.data.length ? (
          <TableComponent data={shoppingList.data} onToggleItem={handleToggleItem} />
        ) : (
          <span>
            <FormattedMessage id="SHOPPING_LIST.EMPTY_LIST" />
          </span>
        )}
      </TableWrapper>
    </>
  );
};

export default ShoppingListViewComponent;
