import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Logout from '../../../shared/assets/icons/logout.svg';
import { routes } from '../../../shared/utils/routes';
import {HamburgerContainer, ListItem, StyledLogoLink, styles} from './navbar.styled';


const links = [
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

const Navbar = ({ signOut }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <HamburgerContainer>
        <IconButton onClick={setOpen}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <IconButton onClick={toggleMenu}>
            <CloseIcon fontSize="large" />
          </IconButton>
          {links.map((link) => (
            <ListItem key={link.translationKey} to={link.to} activeclass="active">
              <FormattedMessage id={link.translationKey} />
            </ListItem>
          ))}
        </Drawer>
      </HamburgerContainer>
      <AppBar sx={styles.appBar} data-testid="navbarBackground">
        <Toolbar sx={styles.toolbar}>
          <StyledLogoLink to={routes.home.path} />
          {links.map((link) => (
            <ListItem to={link.to} key={link.translationKey} activeclass="active" data-testid={link.id}>
              <FormattedMessage id={link.translationKey} />
            </ListItem>
          ))}
        </Toolbar>
        <IconButton onClick={signOut} type="submit" data-testid="logout">
          <img src={Logout} alt="Logout" />
        </IconButton>
      </AppBar>
    </>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func,
};

export default Navbar;
