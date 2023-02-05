import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import { UserContext, useAuth } from '../../../shared/utils/auth';
import { useHttpClient } from '../../../shared/utils/http-client';
import { routes } from '../../../shared/utils/routes';
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
        navigate(routes.home.path);
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
    return <Navigate to={routes.home.path} />;
  }
  return (
    <>
      <RegisterFormComponent removeBorder={removeBorder} error={error} handleRegister={handleRegister} />
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default RegisterComponent;
