import { Navigate } from 'react-router';

import { useAuth } from '../../../shared/utils/auth';
import { routes } from '../../../shared/utils/routes';
import LoginFormComponent from '../components/login-form.component';

const LoginComponent = () => {
  const { auth, currentUser } = useAuth();

  const handleLogin = async ({ email, password }, form) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      const message = 'LOGIN.ERROR.WRONG_CREDENTIALS';
      form.setErrors({ email: message, password: message });
    }
  };

  if (currentUser) {
    return <Navigate to={routes.home.path} />;
  }

  return <LoginFormComponent onSubmit={handleLogin} />;
};

export default LoginComponent;
