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

const RegisterForm = ({ onSubmit }) => {
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
          onSubmit={onSubmit}
          validationSchema={RegisterFormSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, touched, isSubmitting, handleSubmit }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                showError={errors.email && touched.email}
                error={errors.email}
                placeholder="REGISTER.BODY.EMAIL_PLACEHOLDER"
              />

              <Input
                name="password"
                type="password"
                showError={errors.password && touched.password}
                error={errors.email}
                placeholder="REGISTER.BODY.PASSWORD_PLACEHOLDER"
              />

              <ConfirmButton disabled={isSubmitting}>
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
  onSubmit: PropTypes.func,
};

export default RegisterForm;
