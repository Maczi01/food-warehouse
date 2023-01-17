import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import { useAuth, UserContext} from "../../../shared/utills/Auth";
import RegisterFormComponent from "../components/register-form.component";
import {useHttpClient} from '../../../shared/utills/http-client';

const RegisterComponent = ({history}) => {
    const [error, setError] = useState(false);
    const {auth} = useAuth();
    const client = useHttpClient();
    const handleRegister = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        auth
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((cred) => client.create('users', {userMail: email.value}))
            .then(() => {history.push("/");})
            .catch((error) => {
                setError(true);
                notifyErrorLogin(error.message);
                console.log(error);
            });
    };

    const notifyErrorLogin = (error) => {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const removeBorder = () => {
        setError(false);
    };

    const {currentUser} = useContext(UserContext);
    if (currentUser) {
        return <Redirect to="/"/>;
    }
    return (
        <>
            <RegisterFormComponent
                removeBorder={removeBorder}
                error={error}
                handleRegister={handleRegister}
            />
            <ToastContainer autoClose={2500}/>
        </>
    );
};
export default RegisterComponent;
