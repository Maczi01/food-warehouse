import PropTypes from "prop-types";
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { UserContext, useAuth } from '../../../shared/utills/Auth';
import { useHttpClient } from '../../../shared/utills/http-client';
import RegisterFormComponent from '../components/register-form.component';

const RegisterComponent = ({ history }) => {
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const client = useHttpClient();
  const handleRegister = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => client.create('users', { userMail: email.value }))
      .then(() => {
        history.push('/');
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

  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    return <Redirect to={'/'} />;
  }
  return (
    <>
      <RegisterFormComponent
        removeBorder={removeBorder}
        error={error}
        handleRegister={handleRegister}
      />
      <ToastContainer autoClose={2500} />
    </>
  );
};

RegisterComponent.propTypes = {
  history: PropTypes.object,
};

export default RegisterComponent;
