import React from 'react';
import styled from "styled-components";
import edit from "../../asstets/img/edit.svg";
import remove from "../../asstets/img/remove.svg";
import plus from "../../asstets/img/plus.svg";
import minus from "../../asstets/img/minus.svg";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import * as PropTypes from "prop-types";

const ItemWraper = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    align-items: center;
    color: ${({theme}) => theme.colors.blue};
    @media (max-width: ${({theme}) => theme.mobile}) {
        width: 100vw;
        flex-direction: column;
        border: 2px solid ${({theme}) => theme.colors.blue};
    }
`

const NameWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 auto;
    margin-bottom: 20px;;
    @media (max-width: ${({theme}) => theme.mobile}) {
      font-size: 1.2rem;
      margin: 0 auto;
      width: auto;
    }
`

const InfoWrapper = styled.span`
    font-size: 14px;
    width: 100px;
    margin: 0 20px;
    margin-bottom: 20px;
    align-items: center;
    @media (max-width: ${({theme}) => theme.mobile}) {
       font-size: 1.2rem;
       width: auto;
    }
`

const StyledButton = styled.img`
    margin: 0 30px;
    margin-bottom: 20px;
    height: 40px;
    width: 40px;
    justify-content: space-around;
    @media (max-width: ${({theme}) => theme.mobile}) {
        height: 30px;
        width: auto;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px ;
`

const QuantityBarOutside = styled.div`
    margin: 0 auto;
    width: 300px;
    border: 4px solid ${({theme}) => theme.colors.blue};
    height: 30px;
    margin-bottom: 20px;
    padding: 4px;
    @media (max-width: ${({theme}) => theme.mobile}) {
         margin-bottom: 10px;
    }
`
const QuantityBarInside = styled.div`
    height: 100%;
    background-color: ${({theme}) => theme.colors.green};
`

const ListItem =
    ({id, name, children, unit, category, currentQuantity, maximalQuantity, decreaseQuantity, increaseQuantity, deleteItem}) => {
        const history = useHistory();

        return (<ItemWraper>
            <Container>
                <NameWrapper>{name}</NameWrapper>
                <InfoWrapper>{category}</InfoWrapper>
                <InfoWrapper>{currentQuantity} z {maximalQuantity}</InfoWrapper>
                <InfoWrapper>{unit} </InfoWrapper>
            </Container>
            <QuantityBarOutside><QuantityBarInside
                style={{width: `${(currentQuantity / maximalQuantity) * 100}%`}}/></QuantityBarOutside>
            <Container>
                <StyledButton src={minus} onClick={decreaseQuantity}/>
                <StyledButton src={plus} onClick={increaseQuantity}/>
                <StyledButton src={edit}
                              onClick={() => history.push(`/edit/${id}`)}

                />
                <StyledButton src={remove} onClick={deleteItem}/>
            </Container>
            {children}
        </ItemWraper>)
    };

const NumberOrStringType = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    maximalQuantity: NumberOrStringType.isRequired,
    currentQuantity: NumberOrStringType,
};

ListItem.defaultProps = {
    currentQuantity: 0,
};

export default ListItem;