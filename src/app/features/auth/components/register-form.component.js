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
import { RegisterFormSchema } from './register-form.schema';
import StyledTitleComponent from './styled-title.component';

const defaultValues = {
  email: '',
  password: '',
};

const RegisterForm = ({ handleRegister, removeBorder, error }) => {
  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id="REGISTER.HEADER.TITLE" />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id="REGISTER.HEADER.CREATE_NEW_ACCOUNT_MESSAGE" />
      </Paragraph>

      <ItemsContainerComponent>
        <Formik
          enableReinitialize
          initialValues={defaultValues}
          onSubmit={handleRegister}
          validationSchema={RegisterFormSchema}
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
                placeholder="REGISTER.BODY.EMAIL_PLACEHOLDER"
              />

              <Input
                name="password"
                type="password"
                showError={(errors.password && touched.password) || error}
                error={errors.email}
                onFocus={removeBorder}
                placeholder="REGISTER.BODY.PASSWORD_PLACEHOLDER"
              />

              <ConfirmButton>
                <FormattedMessage id="REGISTER.BODY.BUTTON.SIGN_UP" />
              </ConfirmButton>
            </Form>
          )}
        </Formik>

        <Paragraph>
          <FormattedMessage id="REGISTER.BODY.LOG_IN_MESSAGE" />
          <Link to={routes.login.path}>
            <FormattedMessage id="REGISTER.BODY.BUTTON.LOG_IN" />
          </Link>
        </Paragraph>
      </ItemsContainerComponent>
    </>
  );
};

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
  error: PropTypes.bool,
  removeBorder: PropTypes.func,
};

export default RegisterForm;
