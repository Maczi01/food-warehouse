import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBurger = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 4rem;
  height: 4rem;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    outline: none;
  }

  div {
    width: 4rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.darkblue};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger
      open={open}
      onClick={() => setOpen(!open)}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

Burger.defaultProps = {
  open: false,
};

export default Burger;
