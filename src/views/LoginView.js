import React, {useContext, useState} from 'react';
import LoginForm from "../components/organisms/LoginForm";
import {AuthContext} from "../providers/Auth";
import {auth} from '../firebase/firebaseConfig'
import {Redirect} from 'react-router-dom';
import AuthTemplate from "../components/templates/AuthTemplate";
import {toast, ToastContainer} from "react-toastify";

const LoginView = () => {
        const {currentUser} = useContext(AuthContext);
        const [error, setError] = useState(false);

        const handleLogin = event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then(() => {
                    setError(false);
                })
                .catch(error => {
                    setError(true);
                    notifyErrorLogin();
                    console.log(error);
                })
            ;
        };

        const notifyErrorLogin = () => {
            toast.error
            ("Wrong credentials", {
                position: toast.POSITION.TOP_CENTER
            })
        };

        if (currentUser) {
            return <Redirect to="/"/>
        }
        const removeBorder = () => {
            setError(false)
        };

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


