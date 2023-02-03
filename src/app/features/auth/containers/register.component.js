import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import { UserContext, useAuth } from '../../../shared/utills/auth';
import { useHttpClient } from '../../../shared/utills/http-client';
import RegisterFormComponent from '../components/register-form.component';

const RegisterComponent = () => {
  const navigate = useNavigate();
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
        navigate('/');
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
    return <Navigate to={'/'} />;
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

export default RegisterComponent;
