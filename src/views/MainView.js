import React from 'react';
import List from '../components/organisms/List'
import AppContext from "../context/context";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";

const ViewWrapper = styled.div`
     width: 75vw;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
     
     @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
     }
`

const Heading = styled.h1`
     padding: 10px;
     color: ${({theme}) => theme.colors.blue};
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     margin: 0 auto;
     width: 75vw;
     @media (max-width: ${({theme}) => theme.mobile}) {
        padding: 9rem 0 1rem;
        font-size: 26px;
        width: 100vw;
     }
`


const MainView = () => (
    <AppContext.Consumer>
        {(context) => (
            <ViewWrapper>
                <Heading>
                    <FormattedMessage id="what in inventory"/>
                </Heading>
                {/*<img src={shop} alt="Logo"/>*/}
                <List items={context.foodList}
                      deleteItem={context.deleteItem}
                      decreaseQuantity={context.decreaseQuantity}
                      increaseQuantity={context.increaseQuantity}
                      editName={context.editName}
                      toEdit={true}
                      shop={true}
                />
            </ViewWrapper>
        )}
    </AppContext.Consumer>
);

export default MainView