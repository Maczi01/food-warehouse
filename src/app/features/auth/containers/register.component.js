import React, {useContext, useState} from "react";
import {useAuth, UserContext} from "../../../shared/utills/Auth";
import {Redirect} from "react-router-dom";
import RegisterFormComponent from "../components/register-form.component";
import {toast, ToastContainer} from "react-toastify";

const RegisterComponent = ({history}) => {
    const [error, setError] = useState(false);
    const {auth, db} = useAuth();
    const handleRegister = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        auth
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((cred) => {
                return db.collection("users").doc(cred.user.uid).set({
                    userMail: email.value,
                });
                history.push("/");
            })
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
