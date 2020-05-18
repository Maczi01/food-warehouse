import React from 'react';
import ListItem from "../molecules/ListItem";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
    font-size: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.yellow};
    color: ${({theme}) => theme.colors.blue};
    @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
    }
`

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
`

const List = ({items, deleteItem, decreaseQuantity, increaseQuantity, editName, editItem, toEdit, parameter}) => {
    return (
        <>
            <CategoryWrapper>
                {parameter === "all" ? parameter : "All categories"}
            </CategoryWrapper>
            <Link to={'/'}> <Paragraph>🡄 back to select category</Paragraph></Link>
            <UlWrapper>
                {
                    items.map(item => (
                        <ListItem {...item}
                                  key={item.id}
                                  deleteItem={() => deleteItem(item.id)}
                                  toEdit={toEdit}
                                  editItem={editItem}
                                  decreaseQuantity={() => decreaseQuantity(item)}
                                  increaseQuantity={() => increaseQuantity(item)}
                                  editName={() => editName(item)}
                        />
                    ))
                }
            </UlWrapper>
        </>)
};


export default List;
