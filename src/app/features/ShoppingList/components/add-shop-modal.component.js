import PropTypes from 'prop-types';
import styled from 'styled-components';

import ShopFormComponents from './shopping-item-form.components';

const ModalWrapper = styled.div`
  padding: 50px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  min-width: 40vw;
  max-width: 80vw;
  background-color: white;
  position: fixed;
  border: 3px solid #000000;
  border-radius: 10px;
  z-index: 99;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
    position: page;
  }
`;

const AddShopModal = ({ open, onCancel, onSubmit }) => {
  if (!open) {
    return null;
  }

  return (
    <ModalWrapper>
      <ShopFormComponents onCancel={onCancel} onSubmit={onSubmit} data-testid="modal" />
    </ModalWrapper>
  );
};

AddShopModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

AddShopModal.defaultProps = {
  open: false,
};

export default AddShopModal;
