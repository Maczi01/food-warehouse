import styled from "styled-components";
import React from "react";
import {Draggable} from 'react-beautiful-dnd';


const StyledTrWrapper = styled.tr`
    animation: appear 0.3s ease;
    position: relative;
    //background-color: ${({theme}) => theme.colors.green};
    
    background-color: ${({checked, theme}) => checked ? theme.colors.pink : theme.colors.white};
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
`;

const Td = styled.td`
  padding: 10px;
  text-decoration: ${({checked}) => checked ? "line-through" : "none"};
  text-align: center; 
`

const StyledTr = ({item, index, setItemAsChecked}) => (
    <Draggable draggableId={item.id} index={index}>
        {provided => (
            <StyledTrWrapper
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
                checked={item.checked}
            >
                <Td checked={item.checked}>{item.name}</Td>
                <Td checked={item.checked}>{item.neededQuantity}</Td>
                <Td checked={item.checked}>{item.unit}</Td>
                <Td>
                    <input type="checkbox" onChange={() => setItemAsChecked(item)}/>
                </Td>
            </StyledTrWrapper>
        )}
    </Draggable>
)


export default StyledTr;