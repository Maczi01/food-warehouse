import PropTypes from 'prop-types';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Navigate } from 'react-router';

import { useAuth } from '../../../shared/utils/auth';
import { routes } from '../../../shared/utils/routes';
import { toast } from '../../../shared/utils/toast';
import LoginFormComponent from '../components/login-form.component';

const LoginComponent = ({ intl }) => {
  const { auth, currentUser } = useAuth();
  const [error, setError] = useState(false);
  const { formatMessage } = intl;

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
    toast.error(formatMessage({ id: 'LOGIN.ERROR.WRONG_CREDENTIALS' }), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  if (currentUser) {
    return <Navigate to={routes.home.path} />;
  }
  const removeBorder = () => {
    setError(false);
  };

  return <LoginFormComponent removeBorder={removeBorder} error={error} handleLogin={handleLogin} />;
};

LoginComponent.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(LoginComponent);
