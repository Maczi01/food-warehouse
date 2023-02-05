import styled from 'styled-components';

export const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.blue};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  height: 70px;
  width: 230px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  &.active {
    background-color: ${({ theme }) => theme.colors.darkblue};
  }
`;
