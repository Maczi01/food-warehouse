import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../../shared/assets/icons/logo.svg';
import logout from '../../../shared/assets/icons/logout.svg';
import { Burger } from '../../../shared/ui/Burger';
import { ButtonIcon } from '../../../shared/ui/Button';
import { routes } from '../../../shared/utils/routes';
import Menu, { links } from './menu.component';

const HeaderWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 20px;
  transition: all 0.5s linear;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const LinksWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const StyledLogoLink = styled(Link)`
  margin: 0 40px;
  display: block;
  justify-content: flex-start;
  width: 67px;
  height: 67px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: none;
`;

const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  height: 50px;
  width: 230px;
  text-decoration: none;
  margin: 0 10px 0 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.darkblue};
  &.active {
    background-color: ${({ theme }) => theme.colors.darkblue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const HamburgerContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

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
