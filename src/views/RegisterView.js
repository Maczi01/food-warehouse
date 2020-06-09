import React, {useCallback, useContext} from 'react';
import {AuthContext} from "../providers/Auth";
import {auth} from '../firebase/firebase'
import {Redirect} from 'react-router-dom';
import RegisterForm from "../components/organisms/RegisterForm";

const RegisterView = ({history}) => {
        const handleRegister = useCallback(
            async event => {
                event.preventDefault();
                const {email, password} = event.target.elements;
                try {
                    await auth.createUserWithEmailAndPassword(email.value, password.value);
                    history.push("/")
                } catch (err) {
                    console.error("Register Error")
                    alert("alert");
                }
            }, [history]
        );
        const {currentUser} = useContext(AuthContext);
        if (currentUser) {
            return <Redirect to="/"/>
        }
        return (
            <RegisterForm handleRegister={handleRegister}/>
        )
    }
;

export default RegisterView;


