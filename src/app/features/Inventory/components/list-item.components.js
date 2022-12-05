import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import PropTypes from "prop-types";

import edit from "../../../shared/assets/icons/edit.svg";
import remove from "../../../shared/assets/icons/remove.svg";
import plus from "../../../shared/assets/icons/plus.svg";
import minus from "../../../shared/assets/icons/minus.svg";

const ItemWraper = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue};
    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100vw;
        flex-direction: column;
        border: 2px solid ${({ theme }) => theme.colors.blue};
    }
    animation: appear 0.3s ease;
    position: relative;
    @keyframes appear {
      0% {
        opacity: 0;
        top: 30px;
    }
      100% {
        opacity: 1;
        top: 0;
    }
    
`;

const NameWrapper = styled.span`
  font-size: 14px;
  width: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.2rem;
    margin: 0 auto;
    width: auto;
  }
`;

const InfoWrapper = styled.span`
  font-size: 14px;
  width: 100px;
  margin: 0 20px;
  margin-bottom: 20px;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.2rem;
    width: auto;
  }
`;

const StyledButton = styled.img`
  margin: 0 30px;
  margin-bottom: 20px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  justify-content: space-around;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 30px;
    width: auto;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const QuantityBarOutside = styled.div`
  margin: 0 auto;
  width: 300px;
  border: 4px solid ${({ theme }) => theme.colors.blue};
  height: 30px;
  margin-bottom: 20px;
  padding: 4px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 10px;
  }
`;

const QuantityBarInside = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green};
`;

const ListItem = ({
  id,
  name,
  unit,
  currentQuantity,
  maximalQuantity,
  decreaseQuantity,
  increaseQuantity,
  deleteItem,
}) => {
  const history = useHistory();
  return (
    <ItemWraper
        data-testid="item"
    >
      <Container>
        <NameWrapper data-testid="itemName">{name}</NameWrapper>
        <InfoWrapper data-testid="itemUnit">{unit} </InfoWrapper>
        <InfoWrapper data-testid="itemQuantities">
          {currentQuantity} z {maximalQuantity}
        </InfoWrapper>
      </Container>
      <QuantityBarOutside>
        <QuantityBarInside
          style={{ width: `${(currentQuantity / maximalQuantity) * 100}%` }}
        />
      </QuantityBarOutside>
      <Container>
        <StyledButton
          src={minus}
          onClick={decreaseQuantity}
          data-testid="decreaseQuantity"
        />
        <StyledButton
          src={plus}
          onClick={increaseQuantity}
          data-testid="increaseQuantity"
        />
        <StyledButton
          src={edit}
          onClick={() => history.push(`/edit/${id}`)}
          data-testid="editItem"
        />
        <StyledButton
            src={remove}
            onClick={deleteItem}
            data-testid="deleteItem"
        />
      </Container>
    </ItemWraper>
  );
};

const NumberOrStringType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  maximalQuantity: NumberOrStringType.isRequired,
  currentQuantity: NumberOrStringType.isRequired,
};

ListItem.defaultProps = {
  currentQuantity: 0,
};

export default ListItem;