import styled from 'styled-components';

const StyledInputError = styled.input`
    display: block;
    appearance: none;
    outline: 0;
    width: 300px;
    border-radius: 3px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    border: 3px solid red;
    background-color: ${({ theme }) => theme.colors.gray};
    @media (max-width: ${({ theme }) => theme.mobile}) {
       height: 50px;
    }
  }
`;

export default StyledInputError;
