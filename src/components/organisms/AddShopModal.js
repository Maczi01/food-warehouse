import React from 'react';
import styled from "styled-components";
import ShopForm from "./ShopForm";

const ModalWrapper = styled.div`
    padding: 70px 80px 50px;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60vw;
    background-color: white;
    box-shadow: 0 20px 40px -5px rgba(#1e58ff, .3);
    position: fixed;
    border: 2px solid lawngreen;
    z-index: 3;
`

const AddShopModal = ({addItemToShoppingList, setShowAddShopModal}) => (
    <ModalWrapper>
        <ShopForm
            addItemToShoppingList={addItemToShoppingList}
            setShowAddShopModal={setShowAddShopModal}
        />
    </ModalWrapper>
);

export default AddShopModal;