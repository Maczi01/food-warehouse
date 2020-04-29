import styled from "styled-components";
import React from 'react';
import {NavLink} from "react-router-dom";

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({theme}) => theme.colors.blue};
  transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
      width: 100%;
    }
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

const Menu = ({open}) => {
    return (
        <StyledMenu open={open}>
            <ListItem as={NavLink} exact to="/" activeclass="active">Sprawdź zapasy</ListItem>
            <ListItem as={NavLink} to="/add" activeclass="active">Dodaj produkt</ListItem>
            <ListItem as={NavLink} to="/list" activeclass="active">Lista zakupów</ListItem>
            <ListItem as={NavLink} to="/settings" activeclass="active">Ustawienia</ListItem>
        </StyledMenu>
    )
}

export default Menu;