import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { ConfirmButton } from '../../../shared/ui/Button';
import { Form } from '../../../shared/ui/Form';
import { Input } from '../../../shared/ui/Form/Input';
import { Paragraph } from '../../../shared/ui/Paragraph';
import { routes } from '../../../shared/utils/routes';
import ItemsContainerComponent from './items-container.component';
import { LoginFormSchema } from './login-form.schema';
import StyledTitleComponent from './styled-title.component';

// todo: 1. change "handleLogin" name to callback

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = ({ handleLogin, error, removeBorder }) => {
  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id="LOGIN.HEADER.TITLE" />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id="LOGIN.HEADER.WELCOME_MESSAGE" />
      </Paragraph>

      <ItemsContainerComponent>
        <Formik
          enableReinitialize
          initialValues={defaultValues}
          onSubmit={handleLogin}
          validationSchema={LoginFormSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                showError={(errors.email && touched.email) || error}
                error={errors.email}
                onFocus={removeBorder}
                placeholder="LOGIN.BODY.EMAIL_PLACEHOLDER"
              />

              <Input
                name="password"
                type="password"
                showError={(errors.password && touched.password) || error}
                error={errors.email}
                onFocus={removeBorder}
                placeholder="LOGIN.BODY.PASSWORD_PLACEHOLDER"
              />

              <ConfirmButton>
                <FormattedMessage id="LOGIN.BODY.BUTTON.LOG_IN" />
              </ConfirmButton>
            </Form>
          )}
        </Formik>

        <Paragraph>
          <FormattedMessage id="LOGIN.BODY.SING_UP_MESSAGE" />
          <Link to={routes.register.path}>
            <FormattedMessage id="LOGIN.BODY.BUTTON.SIGN_UP" />
          </Link>
        </Paragraph>
      </ItemsContainerComponent>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  error: PropTypes.bool,
  removeBorder: PropTypes.func,
};

export default LoginForm;
