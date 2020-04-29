import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 70px;
  height: 70px;
  background-image: url(${({icon}) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  //background-size: 50% 50%;
  background-color: transparent;
  border: none;
  outline: none;
  margin-left: 10px;
  //:hover { 
  //  transform: scale(1.2);
  // }
  // :active {
  //  transform: translateY(4px);
  // }

`;

export default ButtonIcon;