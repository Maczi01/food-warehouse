import styled from "styled-components";
import React from "react";
import removeFromShoppingList from "../../asstets/img/removeFromShoppingList.svg";
import {Draggable} from 'react-beautiful-dnd';


const StyledTrWrapper = styled.tr`
    animation: appear 0.3s ease;
    position: relative;
    //background-color: ${({theme}) => theme.colors.green};
    
    background-color: ${({checked, theme}) => checked ? theme.colors.pink : theme.colors.white};

    //@keyframes appear {
    //  0% {
    //    opacity: 0;
    //    top: 30px;
    //}
    //  100% {
    //    opacity: 1;
    //    top: 0;
    //}

`;

const StyledButton = styled.img`
    margin: 0 30px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    justify-content: space-around;
    @media (max-width: ${({theme}) => theme.mobile}) {
        height: 20px;
        width: auto;
    }
    z-index: 2;
`;

const Td = styled.td`
  padding: 10px;
  text-decoration: ${({checked}) => checked ? "line-through" : "none"};
  text-align: center; 
`

const StyledTr = ({item, index, deleteFromShoppingList, checkItem}) => (
    <Draggable draggableId={item.id} index={index}>
        {provided => (
            <StyledTrWrapper
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
                checked={item.checked}
            >
                <Td checked={item.checked}>{index + 1}</Td>
                <Td checked={item.checked}>{item.name}</Td>
                <Td checked={item.checked}>{item.currentQuantity}</Td>
                <Td checked={item.checked}>{item.unit}</Td>
                <Td>
                    <input type="checkbox" onChange={() => checkItem(item)}/>
                </Td>

                {/*<Td>*/}
                {/*    <StyledButton src={removeFromShoppingList}*/}
                {/*                  onClick={() => deleteFromShoppingList(item.id)}/>*/}
                {/*</Td>*/}

            </StyledTrWrapper>
        )}
    </Draggable>
)


export default StyledTr;