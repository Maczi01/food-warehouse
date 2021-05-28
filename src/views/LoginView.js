import React, {useCallback, useContext, useState} from 'react';
import styled from 'styled-components';
import LoginForm from "../components/organisms/LoginForm";
import {AuthContext} from "../providers/Auth";
import {auth} from '../firebase/firebaseConfig'
import {Redirect} from 'react-router-dom';

const LoginView = ({history}) => {
        const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] = useState(false)
        const handleLogin = useCallback(
            async event => {
                event.preventDefault();
                const {email, password} = event.target.elements;
                try {
                    await auth.signInWithEmailAndPassword(email.value, password.value);
                    setPreviousLoginAttemptFailed(false);
                    history.push("/");
                } catch (err) {
                    console.error("Login Error");
                    setPreviousLoginAttemptFailed(true);
                }
            }, [history]
        );
        const {currentUser} = useContext(AuthContext);
        if (currentUser) {
            return <Redirect to="/"/>
        }
        return (
            <LoginForm
                handleLogin={handleLogin}
                previousLoginAttemptFailed={previousLoginAttemptFailed}
            />
        )
    }
;

export default LoginView;


