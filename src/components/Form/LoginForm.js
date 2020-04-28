import styled from "styled-components";
import React from 'react'
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

const LoginContainer = styled.div`
display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;


    padding: 50px 100px;
    background-color: ${({theme}) => theme.colors.yellow};
    border-radius: 10px;
    height: 40em;
    
.items {
    display: flex;
    flex-direction: column;
}

.items input {
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
  }
  .button {
    padding: 20px 30px;
    margin-top: 30px;
    outline: none;
    border: none;
    font-size: medium;
    font-weight: 600;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: ${({theme}) => theme.colors.green};
    color: grey;
}

.title {
    margin-bottom: 50px;
    letter-spacing: 5px;
    text-align: center;
    opacity: 0.5;
}
`

const Form = styled.form`
display: flex;
flex-direction: column;
`


const LoginForm = ({handleLogin}) => (
    <LoginContainer>
        <h2 className="title">Login</h2>
        <div className="items">
            <Form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Hasło"/>
                <button className="button">Zaloguj</button>
            </Form>
            <span>Nie masz konta?<Link to="/signup">Zarejestruj się</Link> </span>
        </div>
    </LoginContainer>
);

export default LoginForm;