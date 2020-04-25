import React from 'react';
import logo from '../../asstets/img/logo.svg';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import settings from "../../asstets/img/settings.svg";
import theme from "../../theme/theme";

const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 70px;
  background-color: ${theme.colors.blue};
  margin-bottom: 30px;
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
  color: ${theme.colors.white};
  &.active {
    background-color: ${theme.colors.darkblue};
  }
`

const Header = () => (
    <HeaderWrapper>
        <List>
            <ListItem as={NavLink} exact to="/"><StyledLogoLink/></ListItem>
            <ListItem as={NavLink} to="/edit" activeclass="active">Sprawdź zapasy</ListItem>
            <ListItem as={NavLink} to="/add" activeclass="active">Dodaj produkt</ListItem>
            <ListItem as={NavLink} to="/list" activeclass="active">Lista zakupów</ListItem>
            <ListItem as={NavLink} to="/settings" activeclass="active"><img src={settings}
                                                                            alt="Settings icon"/></ListItem>
        </List>
    </HeaderWrapper>
);

export default Header;

