import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { useInventory } from '../../../services/inventory.store';
import { useStoppingListStore } from '../../../services/shopping-list.store';
import bag from '../../../shared/assets/icons/bag.svg';
import generate from '../../../shared/assets/icons/generate.svg';
import plus from '../../../shared/assets/icons/plus.svg';
import remove from '../../../shared/assets/icons/remove.svg';
import { ButtonIcon } from '../../../shared/ui/Button';
import AddShopModalComponent from '../components/add-shop-modal.component';
import TableComponent from '../components/table.component';

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80vw;
  font-size: 14px;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

const Heading = styled.h1`
  padding: 12px;
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 9rem 0 1rem;
    font-size: 26px;
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  margin: 10px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  margin: 5px;
  width: 150px;
  height: 150px;
`;

const ShoppingListViewComponent = () => {
  const { state: inventoryState, getForCurrentUser: loadInventory } = useInventory();
  const {
    state,
    addItem,
    clearList,
    generateShoppingList,
    getForCurrentUser: loadShoppingList,
  } = useStoppingListStore();
  const [showAddShopModal, setShowAddShopModal] = useState(false);

  const handleGenerateShoppingList = useCallback(() => {
    generateShoppingList(inventoryState.inventory);
  }, [generateShoppingList, inventoryState.inventory]);

  useEffect(() => {
    loadInventory();
    loadShoppingList();
  }, []);

  return (
    <>
      {showAddShopModal && (
        <AddShopModalComponent setShowAddShopModal={setShowAddShopModal} addItemToShoppingList={addItem} />
      )}
      <Heading>
        <FormattedMessage id="SHOPPING_LIST.HEADER" />
      </Heading>
      <TableWrapper>
        <Image src={bag} alt="shopping bag" />
        <ButtonContainer>
          <ButtonIcon onClick={() => setShowAddShopModal((prev) => !prev)} icon={plus} data-testid="showModal" />
          <ButtonIcon onClick={handleGenerateShoppingList} icon={generate} data-testid="generateList" />
          <ButtonIcon onClick={clearList} icon={remove} data-testid="deleteList" />
        </ButtonContainer>
        {state && state.shoppingList && state.shoppingList.length ? (
          <TableComponent data={state.shoppingList} />
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
