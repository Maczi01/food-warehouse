import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../../shared/assets/icons/logo.svg';

export const HeaderWrapper = styled.nav`
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

export const LinksWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledLogoLink = styled(Link)`
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

export const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  height: 50px;
  flex-grow: 1;
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

export const HamburgerContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;
