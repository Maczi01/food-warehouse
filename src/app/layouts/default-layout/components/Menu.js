import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.blue};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  height: 70px;
  width: 230px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  &.active {
    background-color: ${({ theme }) => theme.colors.darkblue};
  }
`;

const Menu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <ListItem
        as={NavLink}
        exact
        to={'/'}
        activeclass={'active'}
        onClick={() => setOpen(!open)}
      >
        <FormattedMessage id={'check inventory'} />
      </ListItem>
      <ListItem
        as={NavLink}
        to={'/add'}
        activeclass={'active'}
        onClick={() => setOpen(!open)}
      >
        <FormattedMessage id={'add product'} />
      </ListItem>
      <ListItem
        as={NavLink}
        to={'/list'}
        activeclass={'active'}
        onClick={() => setOpen(!open)}
      >
        <FormattedMessage id={'shopping list'} />
      </ListItem>
      <ListItem
        as={NavLink}
        to={'/settings'}
        activeclass={'active'}
        onClick={() => setOpen(!open)}
      >
        <FormattedMessage id={'settings'} />
      </ListItem>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  open: false,
};

export default Menu;
