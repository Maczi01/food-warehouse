import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 300px;
  font-size: 18px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 45px;
  padding-left: 5px;
  border: none;
  margin: 6px;
  text-align-last: center;
  outline: none;
  color: black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray};
  border: ${({ errors }) => (errors ? '3px solid red' : 'none')};
  :focus {
    background-color: #b1b1b1;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 50px;
  }
`;

export default StyledSelect;
