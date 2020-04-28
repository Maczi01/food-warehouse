import React from 'react';
import styled from "styled-components";
import edit from "../../asstets/img/edit.svg";
import remove from "../../asstets/img/remove.svg";
import plus from "../../asstets/img/plus.svg";
import minus from "../../asstets/img/minus.svg";

const ItemWraper = styled.li`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    align-items: center;
`

const NameWrapper = styled.span`
    font-size: 14px;
    width: 150px;
    margin: 0 30px;
    margin-bottom: 20px;

`

const StyledButton = styled.img`
    margin: 0 30px;
    margin-bottom: 20px;
    height: 40px;
    width: 40px;
    :hover { transform: scale(1.05); }
     :active {
    transform: translateY(4px);
   }
`

const InfoWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 20px;
    margin-bottom: 20px;

`

const QuantityBarOutside = styled.div`
    margin: 0 auto;
    width: 20vw;
    border: 4px solid ${({theme}) => theme.colors.blue};
    height: 30px;
    margin-bottom: 20px;
    padding: 4px;
`
const QuantityBarInside = styled.div`
    height: 100%;
    background-color: ${({theme}) => theme.colors.green};
`

const ListItem = ({name, children, id, shop, unit, category, currentQuantity, maximalQuantity, decreaseQuantity, increaseQuantity, deleteItem, editName, toEdit}) => (
    <ItemWraper>
        <NameWrapper>{name}</NameWrapper>
        {shop ? (
            <>
                <InfoWrapper>{category}</InfoWrapper>
                <InfoWrapper>{currentQuantity} z {maximalQuantity}</InfoWrapper>
                <InfoWrapper>{unit} </InfoWrapper>
                <QuantityBarOutside><QuantityBarInside
                    style={{width: `${(currentQuantity / maximalQuantity) * 100}%`}}/></QuantityBarOutside>
                <StyledButton src={minus} onClick={decreaseQuantity}/>
                <StyledButton src={plus} onClick={increaseQuantity}/>
                <StyledButton src={edit} onClick={editName}/>
                <StyledButton src={remove} onClick={deleteItem}/>
            </>
        ) : null}
        {children}


    </ItemWraper>
);


export default ListItem;