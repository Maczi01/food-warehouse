import styled from "styled-components";
import React from 'react'
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const LoginContainer = styled.div`
        align-items: center;
        margin: 0 auto;
        width: 60vw;
        text-align: center;
        background-color: ${({theme}) => theme.colors.yellow};
        border-radius: 10px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
`

const StyledInput = styled.input`
    margin-bottom: 30px;
    padding: 2px 0;
    padding-bottom: 5px;
    width: 250px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1.5px solid;
    border-bottom-color: grey;
    font-weight: 700;
    color: ${({theme}) => theme.colors.blue};
    opacity: 0.55;
`

const ItemsContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`

const StyledTitle = styled.div`
    font-size: 20px;
    margin-bottom: 50px;
    letter-spacing: 5px;
    text-align: center;
    opacity: 0.5;
`

const Button = styled.button`
    padding: 20px 30px;
    margin: 30px;
    outline: none;
    border: none;
    font-size: medium;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.green};
    color: grey;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`


const LoginForm = ({handleLogin}) => (
    <LoginContainer>
        <StyledTitle>Login</StyledTitle>
        <ItemsContainer>
            <Form onSubmit={handleLogin} autocomplete="off">
                <StyledInput type="email" name="email" placeholder="Email"/>
                <StyledInput type="password" name="password" placeholder="Hasło"/>
                <Button>
                    <FormattedMessage id="log in"/>
                </Button>
            </Form>
            <span>
                <FormattedMessage id="have not account"/>
                <Link to="/register">
                <FormattedMessage id="sign up"/>
                </Link> </span>
        </ItemsContainer>
    </LoginContainer>
);

export default LoginForm;