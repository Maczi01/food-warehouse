import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { routes } from '../../../shared/utils/routes';
import { ListItem, StyledMenu } from './menu.styled';

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
