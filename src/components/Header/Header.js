import React from 'react';
import logo from '../../asstets/img/logo.svg';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import settings from "../../asstets/img/settings.svg";

const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between; 
  //grid-template-columns: 120px 1fr 100px;
  align-items: center;
  //padding: 30px 60px;
  height: 70px;
  background-color: #00214D;
`

const StyledLogoLink = styled(NavLink)`
    display: block;
    width: 67px;
    height: 67px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    //background-size: 80%;
    border: none;
    //margin-bottom: 10vh;
`;

const List = styled.li`
    display: flex;
    margin: 0; 
    padding: 0;
`
const ListItem = styled.li`
  list-style: none;
  display: flex;
  margin: 50px;
  height: 70px;
  width: 230px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  color: white;
  &.active {
    background-color: red;
  }
`

const Header = () => (
    <HeaderWrapper>
        <List>
            <ListItem><StyledLogoLink exact to="/"/></ListItem>
            <ListItem as={NavLink} to="/edit" activeclass="active">edytuj </ListItem>
            <ListItem as={NavLink} to="/add" activeclass="active">dodaj </ListItem>
            <ListItem as={NavLink} to="/list" activeclass="active">lista </ListItem>
            <ListItem as={NavLink} to="/settings" activeclass="active"><img src={settings}/></ListItem>
        </List>
    </HeaderWrapper>
);

export default Header;

