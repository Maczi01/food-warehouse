import React from 'react';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ButtonIcon from '../components/Button/Button'
import bag from '../asstets/img/bag.svg'

const StyledModalWrapper = styled.div`
  background-color: white;
  //padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: grayscale(1) blur(2px);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalCard = styled.div`
  width: 800px;
  height: auto;
  background-color: white;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 30px 60px -5px hsla(0, 0%, 0%, 0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto 80px;
  justify-items: center;
`;

const StyledModalHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange;
  border-radius: 30px 30px 0 0;
  //padding: 20px;
  display: flex;
  //grid-template-columns: auto 40px;
  align-items: center;
  color: black;
  font-weight: bold;
  font-size: 14px;
`;

const StyledContentModal = styled.div`
  width: 90%;
  padding: 20px;
`;

const Modal = ({closeModalFn, children, btn, title = "title"}) => (
    <StyledModalWrapper>
        <StyledModalCard>
            <StyledModalHeader>
                {title}
            </StyledModalHeader>

            <StyledContentModal>{children}
                <ButtonIcon icon={bag} onClick={() => window.alert("pleple")}>XX</ButtonIcon>
            </StyledContentModal>
            {btn}
        </StyledModalCard>
    </StyledModalWrapper>
);

export default Modal