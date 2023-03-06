import {useCallback, useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {useStoppingListStore} from '../../../services/shopping-list.hook';
import bag from '../../../shared/assets/icons/bag.svg';
import generate from '../../../shared/assets/icons/generate.svg';
import plus from '../../../shared/assets/icons/plus.svg';
import remove from '../../../shared/assets/icons/remove.svg';
import {ButtonIcon} from '../../../shared/ui/Button';
import {useGetInventoriesQuery} from '../../Inventory/get-inventories.query';
import AddShopModalComponent from '../components/add-shop-modal.component';
import TableComponent from '../components/table.component';
import {ButtonContainer, Heading, Image, TableWrapper} from './shopping-list-view.styled';

const ShoppingListViewComponent = () => {
    const inventory = useGetInventoriesQuery();
    const {
        state: shoppingListState,
        addItem,
        clearList,
        generateShoppingList,
        getForCurrentUser: loadShoppingList,
        toggleItem,
    } = useStoppingListStore();
    const [modalOpen, setModalOpen] = useState(false);
    const shoppingList = shoppingListState && shoppingListState.shoppingList ? shoppingListState.shoppingList : [];

    const handleGenerateShoppingList = useCallback(() => {
        if (inventory.isSuccess) {
            generateShoppingList(inventory.data);
        }
    }, [generateShoppingList, inventory.data, inventory.isSuccess]);

    const showModal = () => {
        setModalOpen(true);
    };

    const hideModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (data) => {
        await addItem(data);
        hideModal();
    };

    useEffect(() => {
        loadShoppingList();
    }, []);

    return (
      <>
        <AddShopModalComponent open={modalOpen} onCancel={hideModal} onSubmit={handleSubmit}/>
        <Heading>
          <FormattedMessage id="SHOPPING_LIST.HEADER"/>
        </Heading>
        <TableWrapper>
          <Image src={bag} alt="shopping bag"/>
          <ButtonContainer>
            <ButtonIcon onClick={showModal} icon={plus} data-testid="showModal"/>
            <ButtonIcon onClick={handleGenerateShoppingList} icon={generate} data-testid="generateList"/>
            <ButtonIcon onClick={clearList} icon={remove} data-testid="deleteList"/>
          </ButtonContainer>
          {shoppingList.length ? (
            <TableComponent data={shoppingList} onToggleItem={toggleItem}/>
                ) : (
                  <span>
                    <FormattedMessage id="SHOPPING_LIST.EMPTY_LIST"/>
                  </span>
                )}
        </TableWrapper>
      </>
    );
};

export default ShoppingListViewComponent;
