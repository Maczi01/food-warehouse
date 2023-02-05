import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { UserContext, useAuth } from '../../../shared/utils/auth';
import { useHttpClient } from '../../../shared/utils/http-client';
import { routes } from '../../../shared/utils/routes';
import { toast } from '../../../shared/utils/toast';
import RegisterFormComponent from '../components/register-form.component';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const client = useHttpClient();
  const { auth } = useAuth();
  const { currentUser } = useContext(UserContext);

  const handleRegister = async ({ email, password }) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      client.create('users', { userMail: email });
      navigate(routes.home.path);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (currentUser) {
    return <Navigate to={routes.home.path} />;
  }

  return <RegisterFormComponent onSubmit={handleRegister} />;
};

export default RegisterComponent;
