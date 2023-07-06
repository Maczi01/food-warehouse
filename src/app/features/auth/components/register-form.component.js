import {Button, FormControl, Typography} from '@mui/material';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import {Input} from '../../../shared/ui/Form/Input';
import {routes} from '../../../shared/utils/routes';
import ItemsContainerComponent from './items-container.component';
import {RegisterFormSchema} from './register-form.schema';
import StyledTitleComponent from './styled-title.component';

const defaultValues = {
    email: '',
    password: '',
};

const RegisterForm = ({onSubmit}) => {
    return (
      <>
        <StyledTitleComponent>
          <FormattedMessage id="REGISTER.HEADER.TITLE"/>
        </StyledTitleComponent>
        <Typography paragph={true}>
          <FormattedMessage id="REGISTER.HEADER.CREATE_NEW_ACCOUNT_MESSAGE"/>
        </Typography>

        <ItemsContainerComponent>
          <Formik
            enableReinitialize
            initialValues={defaultValues}
            onSubmit={onSubmit}
            validationSchema={RegisterFormSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({errors, touched, isSubmitting, handleSubmit}) => (
                        // TODO czy w tym wypadku jest sens deklarowac FormWrapper na zewnatrz? czy po prostu
                        // lepiej uzyc FormControl z mui i dodac mu display flex i flex direction column?
              <FormControl
                sx={{display: 'flex', flexDirection: 'column'}} autoComplete="off"
                onSubmit={handleSubmit}
              >
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

                <Button type='submit' color="primary" disabled={isSubmitting}>
                  <FormattedMessage id="REGISTER.BODY.BUTTON.SIGN_UP"/>
                </Button>
              </FormControl>
                    )}
          </Formik>

          <Typography paragraph={true}>
            <FormattedMessage id="REGISTER.BODY.LOG_IN_MESSAGE"/>
            <Link to={routes.login.path}>
              <FormattedMessage id="REGISTER.BODY.BUTTON.LOG_IN"/>
            </Link>
          </Typography>
        </ItemsContainerComponent>
      </>
    );
};

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default RegisterForm;
