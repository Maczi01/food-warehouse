import React, {useCallback, useContext, useState} from 'react';
import styled from 'styled-components';
import LoginForm from "../components/organisms/LoginForm";
import {AuthContext} from "../providers/Auth";
import {auth, db} from '../firebase/firebaseConfig'
import {Redirect} from 'react-router-dom';
import AuthTemplate from "../components/templates/AuthTemplate";

const LoginView = ({history}) => {
        const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] = useState(false)
        // const handleLogin = useCallback(
        //     async event => {
        //         event.preventDefault();
        //         const {email, password} = event.target.elements;
        //         try {
        //             await auth.signInWithEmailAndPassword(email.value, password.value);
        //             setPreviousLoginAttemptFailed(false);
        //             history.push("/");
        //         } catch (err) {
        //             console.error("Login Error");
        //             setPreviousLoginAttemptFailed(true);
        //         }
        //     }, [history]
        // );

    const handleLogin = event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        auth.signInWithEmailAndPassword(email.value, password.value)
                    setPreviousLoginAttemptFailed(false);

        // .then(cred => {
            //     return db.collection('users').doc(cred.user.uid)
            //         .set({
            //             userMail: email.value
            //         });
            // });
        // history.push("/")
    }



        const {currentUser} = useContext(AuthContext);
        if (currentUser) {
            return <Redirect to="/"/>
        }
        return (
            <AuthTemplate>
                <LoginForm
                    handleLogin={handleLogin}
                    previousLoginAttemptFailed={previousLoginAttemptFailed}
                />
            </AuthTemplate>
        )
    }
;

export default LoginView;


