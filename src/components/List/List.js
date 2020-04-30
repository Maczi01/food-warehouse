import React from 'react';
import ListItem from "./ListItem";
import styled from "styled-components";
import theme from "../../theme/theme";
import TableMarkup from "../Table";

const UlWrapper = styled.ul`
    width: 75vw;
    padding: 0;
    margin: 40px auto 0;
    @media (max-width: ${({theme}) => theme.mobile}) {
       width: 100vw;
       font-size: 10px;
       margin: 10px auto 0;
    }
`

const InfoWrapper = styled.h1`
     margin: 0 auto;
     height: 70px;
     display: flex;
     width: 75vw;
     align-items: center;
     justify-content: center;
     background-color: ${({theme}) => theme.colors.blue};
     color: ${({theme}) => theme.colors.white};
`

const CategoryWrapper = styled.div`
    margin: 0 auto;
    height: 70px;
    display: flex;
    width: 75vw;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.blue};
    color: ${({theme}) => theme.colors.white};
    @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
    }
`


const List = ({items, shop, deleteItem, decreaseQuantity, increaseQuantity, editName, toEdit}) => {
    return (
        <>
            <CategoryWrapper>Pieczywo</CategoryWrapper>
            <UlWrapper>
                {items.length ?

                    items.map(item => (
                        <ListItem {...item}
                                  key={item.id}
                                  deleteItem={() => deleteItem(item.id)}
                                  toEdit={toEdit}
                                  decreaseQuantity={() => decreaseQuantity(item)}
                                  increaseQuantity={() => increaseQuantity(item)}
                                  editName={() => editName(item)
                                  }/>
                    )) :
                    <InfoWrapper>Pusta spizarnia!
                    </InfoWrapper>
                }
            </UlWrapper>
        </>)
};
export default List;
