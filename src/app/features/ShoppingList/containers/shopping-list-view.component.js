import React, {useCallback, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {FormattedMessage} from "react-intl";
import {toast, ToastContainer} from "react-toastify";

import bag from "../../../shared/assets/icons/bag.svg";
import styled from "styled-components";
import TableComponent from "../../Inventory/components/table.component";
import AddShopModalComponent from "../components/add-shop-modal.component";
import {ButtonIcon} from "../../../shared/ui/Button";
import plus from "../../../shared/assets/icons/plus.svg";
import remove from "../../../shared/assets/icons/remove.svg";
import generate from "../../../shared/assets/icons/generate.svg";
import {useStoppingListStore} from '../../../services/shopping-list.store';
import {useInventory} from '../../../services/inventory.store';

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80vw;
  font-size: 14px;
  overflow-y: auto;

  @media (max-width: ${({theme}) => theme.mobile}) {
    width: 100vw;
  }
`;

const Heading = styled.h1`
  padding: 12px;
  color: ${({theme}) => theme.colors.blue};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  @media (max-width: ${({theme}) => theme.mobile}) {
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
    const {state: inventoryState} = useInventory()
    const {state, addItem, clearList, generateShoppingList} = useStoppingListStore()

    const handleGenerateShoppingList = useCallback(() => {
        generateShoppingList(inventoryState.inventory);
    }, [generateShoppingList, inventoryState.inventory])

    const [showAddShopModal, setShowAddShopModal] = useState(false);

    const notify = () => {
        toast.success(<FormattedMessage id="pdf saved"/>, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    return (
        <>
            {showAddShopModal && (
                <AddShopModalComponent
                    setShowAddShopModal={setShowAddShopModal}
                    addItemToShoppingList={addItem}
                />
            )}
            <Heading>
                <FormattedMessage id="shopping list"/>
            </Heading>
            <TableWrapper>
                <Image src={bag} alt="shopping bag"/>
                <ButtonContainer>
                    <ButtonIcon
                        onClick={() => setShowAddShopModal((prev) => !prev)}
                        icon={plus}
                        data-testid="showModal"
                    />
                    <ButtonIcon
                        onClick={handleGenerateShoppingList}
                        icon={generate}
                        data-testid="generateList"
                    />
                    <ButtonIcon
                        onClick={clearList}
                        icon={remove}
                        data-testid="deleteList"
                    />
                </ButtonContainer>
                {state.shoppingList.length ? (
                    <TableComponent data={state.shoppingList}/>
                ) : (
                    <span>
            <FormattedMessage id="empty list"/>
          </span>
                )}
                <ToastContainer autoClose={1400}/>
            </TableWrapper>
        </>
    );
};

export default ShoppingListViewComponent;
