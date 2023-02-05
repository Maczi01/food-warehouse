import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import logout from '../../../shared/assets/icons/logout.svg';
import { Burger } from '../../../shared/ui/Burger';
import { ButtonIcon } from '../../../shared/ui/Button';
import { routes } from '../../../shared/utils/routes';
import Menu, { links } from './menu.component';
import { HamburgerContainer, HeaderWrapper, LinksWrapper, List, ListItem, StyledLogoLink } from './navbar.styled';

const Navbar = ({ signOut }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerContainer>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </HamburgerContainer>
      <HeaderWrapper data-testid="navbarBackground">
        <LinksWrapper>
          <StyledLogoLink to={routes.home.path} />
          <List>
            {links.map((link) => (
              <ListItem as={NavLink} to={link.to} key={link.translationKey} activeclass="active" data-testid={link.id}>
                <FormattedMessage id={link.translationKey} />
              </ListItem>
            ))}
          </List>
        </LinksWrapper>

        <ButtonIcon onClick={signOut} type="submit" icon={logout} data-testid="logout" />
      </HeaderWrapper>
    </>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func,
};

export default Navbar;
