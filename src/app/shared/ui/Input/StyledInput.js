import styled from 'styled-components';

const StyledInput = styled.input`
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid white;
    width: 300px;
    margin: 6px;
    text-align: center;
    font-size: 18px;
    color: black;
    transition-duration: 0.25s;
    font-weight: 300;
    background-color: ${({ theme }) => theme.colors.gray};
    border: ${({ errors }) => (errors ? '3px solid red' : 'none')};
    border-radius: 10px;
    :focus{
        background-color: #b1b1b1;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
       height: 50px;
    }
  }
`;

export default StyledInput;
