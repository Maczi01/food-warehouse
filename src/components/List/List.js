import React from 'react';
import ListItem from "./ListItem";
import styled from "styled-components";

const UlWrapper = styled.ul`
  width: 75vw;
  margin: 40px auto 0;
`

const CategoryWrapper = styled.div`
  margin-top: 30px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00214D;
  color: white;
`


const List = ({items, shop, deleteItem, decreaseQuantity, increaseQuantity, editName, toEdit}) => {
    return (
        <>
            <CategoryWrapper>Pieczywo </CategoryWrapper>
            <UlWrapper>
                {items.map(item => (
                    <ListItem {...item}
                              key={item.id}
                              deleteItem={() => deleteItem(item.id)}
                              toEdit={toEdit}
                              shop={shop}
                              decreaseQuantity={() => decreaseQuantity(item.id)}
                              increaseQuantity={() => increaseQuantity(item.id)}
                              editName={() => editName(item.id)
                              }/>
                ))}
            </UlWrapper>
        </>)
};
export default List;
