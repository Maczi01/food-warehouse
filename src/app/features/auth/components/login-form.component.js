import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import eyeclosed from '../../../shared/assets/icons/eyeclosed.svg';
import eyeopen from '../../../shared/assets/icons/eyeopen.svg';
import { ConfirmButton } from '../../../shared/ui/Button';
import { Form, FormIcon } from '../../../shared/ui/Form';
import { PasswordWrapper, StyledInputAuth, StyledPassword } from '../../../shared/ui/Input';
import { Paragraph } from '../../../shared/ui/Paragraph';
import { routes } from '../../../shared/utils/routes';
import ItemsContainerComponent from './items-container.component';
import StyledTitleComponent from './styled-title.component';

// todo: 1. change "handleLogin" name to callback; 2. change "type" to something more meaningful, eg showInputPassword

const LoginForm = ({ handleLogin, error, removeBorder, intl }) => {
  const [type, setType] = useState(false);
  const { formatMessage } = intl;

  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id={'LOGIN.HEADER.TITLE'} />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id={'LOGIN.HEADER.WELCOME_MESSAGE'} />
      </Paragraph>
      <ItemsContainerComponent>
        <Form onSubmit={handleLogin} autocomplete={'off'}>
          <StyledInputAuth
            onFocus={removeBorder}
            error={error}
            type={'email'}
            name={'email'}
            placeholder={formatMessage({ id: 'LOGIN.BODY.EMAIL_PLACEHOLDER' })}
          />
          <PasswordWrapper>
            <StyledPassword
              onFocus={removeBorder}
              error={error}
              type={type ? 'text' : 'password'}
              name={'password'}
              placeholder={formatMessage({ id: 'LOGIN.BODY.PASSWORD_PLACEHOLDER' })}
            />
            <FormIcon onClick={() => setType(!type)} src={type ? eyeopen : eyeclosed} />
          </PasswordWrapper>
          <ConfirmButton>
            <FormattedMessage id={'LOGIN.BODY.BUTTON.LOG_IN'} />
          </ConfirmButton>
        </Form>
        <Paragraph>
          <FormattedMessage id={'LOGIN.BODY.SING_UP_MESSAGE'} />
          <Link to={routes.register.path}>
            <FormattedMessage id={'LOGIN.BODY.BUTTON.SIGN_UP'} />
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
  intl: PropTypes.object,
};

export default injectIntl(LoginForm);
