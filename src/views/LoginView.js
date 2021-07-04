import React, {useCallback, useContext, useState} from 'react';
import styled from 'styled-components';
import LoginForm from "../components/organisms/LoginForm";
import {AuthContext} from "../providers/Auth";
import {auth, db} from '../firebase/firebaseConfig'
import {Redirect} from 'react-router-dom';
import AuthTemplate from "../components/templates/AuthTemplate";
import WrongPasswordModal from "../components/organisms/WrongPasswordModal";
import {toast, ToastContainer} from "react-toastify";
import {Form} from "formik";

const LoginView = () => {
        const {currentUser} = useContext(AuthContext);
    const [error, setError] = useState(false);

        const handleLogin = event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    setError(false)
                })
                .catch(error => {
                    setError(true)
                    notify();
                    console.log(error);
                })
            ;
        };

        const notify = () => {
            toast.error
            ("Wrong credentials", {
                position: toast.POSITION.TOP_CENTER
            })
        };

        if (currentUser) {
            return <Redirect to="/"/>
        }
        const removeBorder = (blur) =>{
            setError(false)
        }
        return (
            <AuthTemplate>
                <LoginForm
                    removeBorder={removeBorder}
                    error={error}
                    handleLogin={handleLogin}
                />
                <ToastContainer autoClose={2500}/>

            </AuthTemplate>
        )
    }
;

export default LoginView;


