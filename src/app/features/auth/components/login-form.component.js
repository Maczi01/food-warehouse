import {Button, FormControl, Typography} from '@mui/material'
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import {Input} from '../../../shared/ui/Form/Input';
import {routes} from '../../../shared/utils/routes';
import ItemsContainerComponent from './items-container.component';
import {LoginFormSchema} from './login-form.schema';
import StyledTitleComponent from './styled-title.component';

const defaultValues = {
    email: '',
    password: '',
};

const LoginForm = ({onSubmit}) => {
    return (
        <>
            <StyledTitleComponent>
                <FormattedMessage id="LOGIN.HEADER.TITLE"/>
            </StyledTitleComponent>
            <Typography paragraph={true}>

                <FormattedMessage id="LOGIN.HEADER.WELCOME_MESSAGE"/>
            </Typography>

            <ItemsContainerComponent>
                <Formik
                    enableReinitialize
                    initialValues={defaultValues}
                    onSubmit={onSubmit}
                    validationSchema={LoginFormSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({errors, touched, isSubmitting, handleSubmit}) => (
                        <FormControl
                            sx={{display: 'flex', flexDirection: 'column'}}
                            autoComplete="off">
                            <Input
                                name="email"
                                type="email"
                                showError={errors.email && touched.email}
                                error={errors.email}
                                placeholder="LOGIN.BODY.EMAIL_PLACEHOLDER"
                            />

                            <Input
                                name="password"
                                type="password"
                                showError={errors.password && touched.password}
                                error={errors.email}
                                placeholder="LOGIN.BODY.PASSWORD_PLACEHOLDER"
                            />
                            {/*TODO musiaem przeniesc handleSubmit na onClicka... nie mam pewnosci co do
                            tego rozwiazania. wczesniej bylo w form, w onSubmit*/}
                            <Button onClick={handleSubmit} type='submit' color="primary" disabled={isSubmitting}>
                                <FormattedMessage id="LOGIN.BODY.BUTTON.LOG_IN"/>
                            </Button>
                        </FormControl>
                    )}
                </Formik>

                <Typography paragraph={true}>
                    <FormattedMessage id="LOGIN.BODY.SING_UP_MESSAGE"/>
                    <Link to={routes.register.path}>
                        <FormattedMessage id="LOGIN.BODY.BUTTON.SIGN_UP"/>
                    </Link>
                </Typography>
            </ItemsContainerComponent>
        </>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default LoginForm;
