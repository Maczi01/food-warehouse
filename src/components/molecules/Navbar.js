import React from 'react';
import logo from '../../asstets/img/logo.svg';
import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import Menu from "./Menu";
import Burger from "../atoms/Burger";
import {FormattedMessage} from 'react-intl'
import {auth} from "../../firebase/firebaseConfig";
import logout from "../../asstets/img/logout.svg";
import ButtonIcon from "../atoms/ButtonIcon";

const HeaderWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: ${({theme}) => theme.colors.blue};
  margin-bottom: 20px;
  transition: all 0.5s linear;
  @media (max-width: ${({theme}) => theme.mobile}) {
    display: none;
  }
`;

const LinksWrapper = styled.nav`
    display: flex;
    justify-content: space-between; 
`

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
    background-color: ${({theme}) => theme.colors.yellow};
    border-radius: 5px;
    color: ${({theme}) => theme.colors.darkblue};
    &.active {
      background-color: ${({theme}) => theme.colors.darkblue};
      color: ${({theme}) => theme.colors.white};
    }
`;

const HamburgerContainer = styled.div`
    @media (min-width: ${({theme}) => theme.mobile}) {
      display: none;
    }
`;

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <HamburgerContainer>
                <Burger open={open} setOpen={setOpen}/>
                <Menu open={open} setOpen={setOpen}/>
            </HamburgerContainer>
            <HeaderWrapper>
                <LinksWrapper>
                    <StyledLogoLink to="/"/>
                    <List>
                        <ListItem as={NavLink} exact to="/" activeclass="active"><
                            FormattedMessage id="check inventory"/>
                        </ListItem>
                        <ListItem as={NavLink} to="/add" activeclass="active">
                            <FormattedMessage id="add product"/>
                        </ListItem>
                        <ListItem as={NavLink} to="/list" activeclass="active">
                            <FormattedMessage id="shopping list"/>
                        </ListItem>
                        <ListItem as={NavLink} to="/settings" activeclass="active">
                            <FormattedMessage id="settings"/>
                        </ListItem>
                    </List>
                </LinksWrapper>

                <ButtonIcon
                    onClick={() => auth.signOut()}
                    type="submit"
                    icon={logout}
                />
            </HeaderWrapper>
        </>
    )
};

export default Navbar;

