import styled from 'styled-components';

const ButtonIcon = styled.button`
  cursor: pointer;
  display: block;
  width: 70px;
  height: 70px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: transparent;
  border: none;
  outline: none;
  margin-left: 10px;
  transition: all 0.6s ease 0s;
  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
  }
  :active {
    box-shadow: 0 5px #e5e5e5;
    transform: translateY(6px);
  }
  :disabled {
    cursor: default;
  }
`;

export default ButtonIcon;
