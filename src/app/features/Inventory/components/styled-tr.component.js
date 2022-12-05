import styled from "styled-components";
import React from "react";

const StyledTrWrapper = styled.tr`
  animation: appear 0.3s ease;
  position: relative;
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.pink : theme.colors.white};
`;

const Td = styled.td`
  padding: 10px;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  text-align: center;
`;

const StyledTr = ({ item, setItemAsChecked }) => (
  <StyledTrWrapper checked={item.checked}>
    <Td checked={item.checked}>{item.name}</Td>
    <Td checked={item.checked}>{item.neededQuantity}</Td>
    <Td checked={item.checked}>{item.unit}</Td>
    <Td>
      <input type="checkbox" onChange={() => setItemAsChecked(item)} />
    </Td>
  </StyledTrWrapper>
);

export default StyledTr;