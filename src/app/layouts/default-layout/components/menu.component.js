import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from '../../../shared/utils/routes';

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

export const links = [
  {
    id: 'checkInventory',
    to: routes.home.path,
    translationKey: 'GLOBAL.MENU.CHECK_INVENTORY',
  },
  {
    id: 'addProduct',
    to: routes.product.add.path,
    translationKey: 'GLOBAL.MENU.ADD_PRODUCT',
  },
  {
    id: 'shoppingList',
    to: routes.inventory.list.path,
    translationKey: 'GLOBAL.MENU.SHOPPING_LIST',
  },
  {
    id: 'settings',
    to: routes.settings.path,
    translationKey: 'GLOBAL.MENU.SETTINGS',
  },
];

export const MenuItems = ({ onClick }) => {
  return (
    <>
      {links.map((link) => (
        <ListItem key={link.translationKey} as={NavLink} to={link.to} activeclass="active" onClick={onClick}>
          <FormattedMessage id={link.translationKey} />
        </ListItem>
      ))}
    </>
  );
};

MenuItems.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Menu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <MenuItems onClick={() => setOpen(!open)} />
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
