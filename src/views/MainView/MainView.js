import React from 'react';
import List from '../../components/List/List'
import AppContext from "../../context/context";
import shop from '../../asstets/img/shop.svg';
import styled from "styled-components";
import theme from "../../theme/theme";
import {auth} from "../../firebase/firebase";

const ViewWrapper = styled.div`
     width: 75vw;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
`

const Heading = styled.h1`
     //margin-top: 30px;
     color: ${({theme}) => theme.colors.blue};
     text-align: center;
         display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 75vw;
`


const MainView = () => (
    <AppContext.Consumer>
        {(context) => (
            <ViewWrapper>
                <Heading>Sprawdź, co masz w spiżarni</Heading>
                {/*<img src={shop} alt="Logo"/>*/}
                <List items={context.foodList}
                      deleteItem={context.deleteItem}
                      decreaseQuantity={context.decreaseQuantity}
                      increaseQuantity={context.increaseQuantity}
                      editName={context.editName}
                      toEdit={true}
                      shop={true}
                />
                <button onClick={() => auth.signOut()}>Wyloguj</button>
            </ViewWrapper>
        )}
    </AppContext.Consumer>
);

export default MainView