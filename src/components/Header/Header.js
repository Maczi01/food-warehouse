import React, {useContext} from 'react';
import logo from '../../asstets/img/logo.svg';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import settings from "../../asstets/img/settings.svg";
import {AuthContext} from "../../firebase/Auth";
import Menu from "../Menu";
import Burger from "../Burger";

const HeaderWrapper = styled.nav`
 @media (max-width: ${({theme}) => theme.mobile}) {
        //background-color: ${({theme}) => theme.colors.pink};
    display: none;
    }
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 70px;
  background-color: ${({theme}) => theme.colors.blue};
  margin-bottom: 10px;
      transition: all 0.5s linear;

`

const StyledLogoLink = styled.div`
    display: block;
    width: 67px;
    height: 67px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: none;
`;

const List = styled.li`
    @media (max-width: ${({theme}) => theme.mobile}) {
        background-color: ${({theme}) => theme.colors.pink};
    }
    display: flex;
    margin: 0; 
    padding: 0;
`
const ListItem = styled.li`
  list-style: none;
  display: flex;
  //margin: 50px;
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
        //background-color: ${({theme}) => theme.colors.pink};
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
                    <List>
                        <ListItem as={NavLink} exact to="/"><StyledLogoLink/></ListItem>
                        <ListItem as={NavLink} exact to="/" activeclass="active">Sprawdź zapasy</ListItem>
                        <ListItem as={NavLink} to="/add" activeclass="active">Dodaj produkt</ListItem>
                        <ListItem as={NavLink} to="/list" activeclass="active">Lista zakupów</ListItem>
                        {/*<ListItem>You are logged as {(auth.currentUser.email)}</ListItem>*/}
                        <ListItem as={NavLink} to="/settings" activeclass="active"><img src={settings}
                                                                                        alt="Settings icon"/></ListItem>
                    </List>
                </HeaderWrapper> : null}

        </>
    )
};

export default Header;

