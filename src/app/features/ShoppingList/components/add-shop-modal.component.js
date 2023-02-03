import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ShopFormComponents from './shop-form.components';

const ModalWrapper = styled.div`
  padding: 50px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  background-color: white;
  box-shadow: 0 20px 40px -5px rgba(#1e58ff, 0.3);
  position: fixed;
  border: 3px solid #000000;
  border-radius: 10px;
  z-index: 99;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
    position: page;
  }
`;

const AddShopModal = ({ addItemToShoppingList, setShowAddShopModal }) => (
  <ModalWrapper>
    <ShopFormComponents
      addItemToShoppingList={addItemToShoppingList}
      setShowAddShopModal={setShowAddShopModal}
      data-testid={'modal'}
    />
  </ModalWrapper>
);

AddShopModal.propTypes = {
  addItemToShoppingList: PropTypes.func,
  setShowAddShopModal: PropTypes.func,
};

export default AddShopModal;
