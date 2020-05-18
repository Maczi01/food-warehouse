import React, {useContext} from 'react';
import logo from '../../asstets/img/logo.svg';
import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../providers/Auth";
import Menu from "./Menu";
import Burger from "../atoms/Burger";
import {FormattedMessage} from 'react-intl'

const HeaderWrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  background-color: ${({theme}) => theme.colors.blue};
  margin-bottom: 20px;
  transition: all 0.5s linear;
  @media (max-width: ${({theme}) => theme.mobile}) {
    display: none;
  }
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
`

const ListItem = styled.li`
    list-style: none;
    display: flex;
    height: 70px;
    width: 230px;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.colors.white};
    &.active {
      background-color: ${({theme}) => theme.colors.darkblue};
    }
`

const HamburgerContainer = styled.div`
    @media (min-width: ${({theme}) => theme.mobile}) {
      display: none;
    }
`

const Header = () => {
    const {currentUser} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {currentUser ?
                <HamburgerContainer>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen}/>
                </HamburgerContainer> : null}
            {currentUser ?
                <HeaderWrapper>
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
                </HeaderWrapper> : null}
        </>
    )
};

export default Header;

