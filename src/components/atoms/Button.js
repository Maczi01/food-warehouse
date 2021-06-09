import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
    width: 170px;
    height: 50px;
    outline: none;
    border: none;
    font-size: 16px;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.pink};
    color: ${({theme}) => theme.colors.white};
`;

const Button = ({children}) => (
    <StyledButton>
        {children}
    </StyledButton>
);

export default Button;

