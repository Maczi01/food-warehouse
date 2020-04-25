import React from 'react';
import styled from "styled-components";
import edit from "../../asstets/img/edit.svg";
import remove from "../../asstets/img/remove.svg";

const ItemWraper = styled.li`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`

const NameWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 30px;
`

const StyledButton = styled.img`
    margin: 0 30px;
`

const QuantityWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 30px;
`

const QuantityBarOutside = styled.div`
    margin: 0 auto;
    width: 30vw;
    border: 4px solid #00214D;
    height: 30px;
    margin-bottom: 20px;
    padding: 4px;
`
const QuantityBarInside = styled.div`
    height: 100%;
    background-color: #00EBC7;
`

const ListItem = ({name, id, shop, currentQuantity, maximalQuantity, decreaseQuantity, increaseQuantity, deleteItem, editName, toEdit}) => (
    <ItemWraper>
        <NameWrapper>{name}</NameWrapper>
        <QuantityWrapper>2 z 4 szt</QuantityWrapper>
        <QuantityBarOutside><QuantityBarInside/></QuantityBarOutside>
        <StyledButton src={edit}/>
        <StyledButton src={remove}/>
    </ItemWraper>
);


export default ListItem;