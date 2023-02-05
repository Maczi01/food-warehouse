import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { UserContext, useAuth } from '../../../shared/utils/auth';
import { useHttpClient } from '../../../shared/utils/http-client';
import { routes } from '../../../shared/utils/routes';
import { toast } from '../../../shared/utils/toast';
import RegisterFormComponent from '../components/register-form.component';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const client = useHttpClient();
  const { auth } = useAuth();
  const { currentUser } = useContext(UserContext);

  const handleRegister = ({ email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => client.create('users', { userMail: email }))
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

  if (currentUser) {
    return <Navigate to={routes.home.path} />;
  }

  return <RegisterFormComponent removeBorder={removeBorder} error={error} handleRegister={handleRegister} />;
};

export default RegisterComponent;
