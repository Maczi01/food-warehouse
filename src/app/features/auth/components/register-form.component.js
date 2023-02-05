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

const RegisterForm = ({ handleRegister, removeBorder, error, intl }) => {
  const [type, setType] = useState(false);
  const { formatMessage } = intl;

  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id={'REGISTER.HEADER.TITLE'} />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id={'REGISTER.HEADER.CREATE_NEW_ACCOUNT_MESSAGE'} />
      </Paragraph>
      <ItemsContainerComponent>
        <Form onSubmit={handleRegister} autocomplete={'off'}>
          <StyledInputAuth
            onFocus={removeBorder}
            error={error}
            type={'email'}
            name={'email'}
            placeholder={formatMessage({ id: 'REGISTER.BODY.PASSWORD_PLACEHOLDER' })}
          />
          <PasswordWrapper>
            <StyledPassword
              onFocus={removeBorder}
              error={error}
              type={type ? 'text' : 'password'}
              name={'password'}
              placeholder={formatMessage({ id: 'REGISTER.BODY.PASSWORD_PLACEHOLDER' })}
            />
            <FormIcon onClick={() => setType(!type)} src={type ? eyeclosed : eyeopen} />
          </PasswordWrapper>
          <ConfirmButton>
            <FormattedMessage id={'REGISTER.BODY.BUTTON.SIGN_UP'} />
          </ConfirmButton>
        </Form>
        <Paragraph>
          <FormattedMessage id={'REGISTER.BODY.LOG_IN_MESSAGE'} />
          <Link to={routes.login.path}>
            <FormattedMessage id={'REGISTER.BODY.BUTTON.LOG_IN'} />
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
  intl: PropTypes.object,
};

export default injectIntl(RegisterForm);
