import React from 'react';
import List from '../../components/List/List'
import AppContext from "../../context/context";
import shop from '../../asstets/img/shop.svg';
import styled from "styled-components";

const Heading = styled.h1`
     margin-top: 30px;
     color: #00214D;
     text-align: center;
`
const ViewWrapper = styled.div`
     width: 75vw;
     margin: 0 auto;
     display: flex;
     flex-direction: column;
`

const MainView = () => (
    <AppContext.Consumer>
        {(context) => (
            <ViewWrapper>
                <Heading>Sprawdź, co masz w spiżarni</Heading>
                {/*<img src={shop} alt="Logo"/>*/}

                <List items={context.foodList}
                      deleteItem={context.deleteItem}
                      toEdit={false}
                      shop={true}
                />
            </ViewWrapper>
        )}
    </AppContext.Consumer>
);

export default MainView