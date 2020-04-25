import React from 'react';
import styled from "styled-components";
import edit from "../../asstets/img/edit.svg";
import remove from "../../asstets/img/remove.svg";
// import theme from "../../theme/theme";

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
    :hover { transform: scale(1.2); }
`

const QuantityWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 30px;
    margin-bottom: 20px;

`

const QuantityBarOutside = styled.div`
    margin: 0 auto;
    width: 30vw;
    border: 4px solid ${({theme}) => theme.colors.blue};
    height: 30px;
    margin-bottom: 20px;
    padding: 4px;
`
const QuantityBarInside = styled.div`
    height: 100%;
    background-color: ${({theme}) => theme.colors.green};
`

const ListItem = ({name,children, id, shop, currentQuantity, maximalQuantity, typeOfUnit = "szt", decreaseQuantity, increaseQuantity, deleteItem, editName, toEdit}) => (
    <ItemWraper>
        <NameWrapper>{name}</NameWrapper>
        {shop ? (
            <>
                <QuantityWrapper>{currentQuantity} z {maximalQuantity} {typeOfUnit}</QuantityWrapper>
                <QuantityBarOutside><QuantityBarInside
                    style={{width: `${(currentQuantity / maximalQuantity) * 100}%`}}/></QuantityBarOutside>
                <StyledButton src={edit}/>
                <StyledButton src={remove}/>
            </>
        ) : null}
        {children}

        {/*<StyledButton src={edit}/>*/}
        {/*{shop ? (<StyledButton src={remove}/>*/}
        {/*) : null}*/}


    </ItemWraper>
);


export default ListItem;