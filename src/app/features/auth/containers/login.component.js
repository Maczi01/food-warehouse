import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAuth } from '../../../shared/utills/auth';
import LoginFormComponent from '../components/login-form.component';

const LoginComponent = () => {
  const { auth, currentUser } = useAuth();
  const [error, setError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        setError(false);
      })
      .catch((error) => {
        setError(true);
        notifyErrorLogin();
        console.log(error);
      });
  };

  const notifyErrorLogin = () => {
    toast.error('Wrong credentials', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  if (currentUser) {
    return <Redirect to={'/'} />;
  }
  const removeBorder = () => {
    setError(false);
  };

  return (
    <>
      <LoginFormComponent
        removeBorder={removeBorder}
        error={error}
        handleLogin={handleLogin}
      />
      <ToastContainer autoClose={2500} />
    </>
  );
};
export default LoginComponent;
