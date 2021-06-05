import styled from "styled-components";
import React from "react";
import removeFromShoppingList from "../../asstets/img/removeFromShoppingList.svg";
import {Draggable} from 'react-beautiful-dnd';


const StyledTrWrapper = styled.tr`
    animation: appear 0.3s ease;
    position: relative;
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
    height: 20px;
    width: 20px;
    justify-content: space-around;
    @media (max-width: ${({theme}) => theme.mobile}) {
        height: 20px;
        width: auto;
    }
    z-index: 2;
`;

const StyledTr = ({item, index, deleteFromShoppingList, markAsPurchased}) => (
    <Draggable draggableId={item.id} index={index}>
        {provided => (
            <StyledTrWrapper
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.maximalQuantity - item.currentQuantity}</td>
                <td>{item.unit}</td>
                {/*<td>*/}
                {/*    <input type="checkbox" onChange={() => markAsPurchased(item)}/>*/}
                {/*</td>*/}

                <td>
                    <StyledButton src={removeFromShoppingList}
                                  onClick={() => deleteFromShoppingList(item.id)}/>
                </td>

            </StyledTrWrapper>
        )}
    </Draggable>
)


export default StyledTr;