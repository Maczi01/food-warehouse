import React from 'react';
import AppContext from "../context/context";
import 'react-toastify/dist/ReactToastify.css';
import bag from '../asstets/img/bag.svg';
import styled from "styled-components";
import Table from "../components/molecules/Table";
import {FormattedMessage} from "react-intl";
import MainTemplate from "../components/templates/MainTemplate";

const ListWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 58vw;
      font-size: 14px;
       @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
     }
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

const Image = styled.img`
margin: 25px;
`;

const ListView = () => (
    <MainTemplate>
        <Heading>
            <FormattedMessage id="shopping list"/>
        </Heading>
        <Image src={bag} alt="shoping bag"/>
        <AppContext.Consumer>
            {(context) => {
                const shoppingList = context.foodList.filter(item => (
                    item.currentQuantity < item.minimalQuantity
                ));
                return (shoppingList.length ?
                        <Table data={shoppingList}/>
                        :
                        <span>
                            <FormattedMessage id="empty list"/>
                        </span>
                )
            }
            }
        </AppContext.Consumer>
    </MainTemplate>
)


export default ListView;

