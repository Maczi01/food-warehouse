import React from 'react';
import ListItem from "./ListItem";
import styled from "styled-components";
import theme from "../../theme/theme";

const UlWrapper = styled.ul`
    width: 75vw;
    margin: 40px auto 0;
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
                                  shop={shop}
                                  decreaseQuantity={() => decreaseQuantity(item.id)}
                                  increaseQuantity={() => increaseQuantity(item.id)}
                                  editName={() => editName(item.id)
                                  }/>
                    )) :
                    <InfoWrapper>Pusta spizarnia!</InfoWrapper>
                }
            </UlWrapper>
        </>)
};
export default List;
