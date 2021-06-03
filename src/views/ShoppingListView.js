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
import ButtonIcon from "../components/atoms/ButtonIcon";
import plus from "../asstets/img/plus.svg";
import pdf from "../asstets/img/pdf.svg";
import sms from "../asstets/img/sms.svg";
import {ToastContainer} from "react-toastify";
import { Droppable } from 'react-beautiful-dnd';

const TableWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 58vw;
      font-size: 14px;
     //   @media (max-width: ${({theme}) => theme.mobile}) {
     //    width: 100vw;
     // }
`;

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

const ButtonContainer = styled.div`
      margin: 20px 20px 20px 0;
      display: flex;
      justify-content: flex-end;
`

const Image = styled.img`
      margin: 25px;
      width: 150px;
      height: 150px;
`;

const ShoppingListView = () => {
    const {shoppingList, addItemToShoppingList, generateShoppingList, deleteFromShoppingList} = useContext(AppContext);
    const [showAddShopModal, setShowAddShopModal] = useState(false);
    // useEffect(() => {
    //     generateShoppingList();
    // }, []);


    //
    // const shoppingList = foodList.filter(item => (
    //     item.currentQuantity < item.minimalQuantity
    // ));

    return (
        <MainTemplate>
            {showAddShopModal && <AddShopModal
                setShowAddShopModal={setShowAddShopModal}
                addItemToShoppingList={addItemToShoppingList}/>}
            <Heading>
                <FormattedMessage id="shopping list"/>
            </Heading>


            <TableWrapper>
                <Image src={bag} alt="shoping bag"/>

                <ButtonContainer>
                    <ButtonIcon
                        onClick={() => setShowAddShopModal(prev => !prev)}
                        icon={plus}
                    />
                    <ButtonIcon
                        onClick={() => {
                            // jsPdfGenerator();
                            // notify()
                        }}
                        icon={pdf}
                    />
                    <ButtonIcon
                        onClick={generateShoppingList}
                        icon={sms}
                    />
                </ButtonContainer>

                {
                    shoppingList.length ?

                        /*<Droppable droppableId={1}>*/

                        // {provided => (
                                <Table
                                    // innerRef={provided.innerRef} {...provided.droppableProps}
                                    data={shoppingList}
                                    setShowAddShopModal={setShowAddShopModal}
                                    deleteFromShoppingList={deleteFromShoppingList}
                                />
                            // }
                        /*</Droppable>*/
                        :
                        <span>
                        <FormattedMessage id="empty list"/>
                    </span>
                }


                <ToastContainer autoClose={1400}/>
            </TableWrapper>
        </MainTemplate>
    )
};


export default ShoppingListView;

