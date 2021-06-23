import React from 'react';
import styled from "styled-components";
import ShopForm from "./ShopForm";

const ModalWrapper = styled.div`
    padding: 0 80px 50px;
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
    z-index: 99;
      @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
        //height: 100%;
        position: page;  
     }
`

const WrongPasswordModal = ({error}) => (
    <ModalWrapper>
        <p>Wrong password</p>
    </ModalWrapper>
);

export default WrongPasswordModal;