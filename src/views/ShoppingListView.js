import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context/context";
import 'react-toastify/dist/ReactToastify.css';
import bag from '../asstets/img/bag.svg';
import styled from "styled-components";
import Table from "../components/molecules/Table";
import {FormattedMessage} from "react-intl";
import MainTemplate from "../components/templates/MainTemplate";
import Modal from "../components/molecules/Modal";
import AddShopModal from "../components/organisms/AddShopModal";

// const ListWrapper = styled.div`
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-direction: column;
//       margin: 0 auto;
//       width: 58vw;
//       font-size: 14px;
//        @media (max-width: ${({theme}) => theme.mobile}) {
//         width: 100vw;
//      }
// `;

const Heading = styled.h1`
     padding: 16px;
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

const Image = styled.img`
margin: 25px;
`;

const ShoppingListView = () => {
    const {shoppingList, generateShoppingList} = useContext(AppContext);
    const [showAddShopModal, addItemToShoppintList] = useState(true);
    useEffect(() => {
        generateShoppingList();
    }, []);


    //
    // const shoppingList = foodList.filter(item => (
    //     item.currentQuantity < item.minimalQuantity
    // ));

    return (
        <MainTemplate>
            {showAddShopModal && <AddShopModal addItemToShoppintList={addItemToShoppintList}/>}
            <Heading>
                <FormattedMessage id="shopping list"/>
            </Heading>
            <Image src={bag} alt="shoping bag"/>
            {
                shoppingList.length ?
                    <Table data={shoppingList}/>
                    :
                    <span>
                        <FormattedMessage id="empty list"/>
                    </span>
            }
        </MainTemplate>
    )
};


export default ShoppingListView;

