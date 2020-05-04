import React, {useCallback, useContext} from 'react';
import styled from 'styled-components';
import LoginForm from "../components/organisms/LoginForm";
import {AuthContext} from "../providers/Auth";
import {auth} from '../firebase/firebase'
import {Redirect} from 'react-router-dom';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const StyledLoginCard = styled.div`
  width: 400px;
  height: 300px;
  background-color: orange;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const StyledCreateAcc = styled.div`
  margin: 20px;
  font-size: 14px;
`;
const StyledHeader = styled.div`
  margin: 20px;
  font-size: 14px;
`;

const LoginView = ({history}) => {
        const handleLogin = useCallback(
            async event => {
                event.preventDefault();
                const {email, password} = event.target.elements;
                try {
                    await auth.signInWithEmailAndPassword(email.value, password.value);
                    history.push("/")
                } catch (err) {
                    console.error("Login Error")
                    alert("alert");
                }
            }, [history]
        );
        const {currentUser} = useContext(AuthContext);
        if (currentUser) {
            return <Redirect to="/"/>
        }
        return (
            <LoginForm handleLogin={handleLogin}/>
        )
    }
;

export default LoginView;


