import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import eyeclosed from '../../../shared/assets/icons/eyeclosed.svg';
import eyeopen from '../../../shared/assets/icons/eyeopen.svg';
import { ConfirmButton } from '../../../shared/ui/Button';
import { Form, FormIcon } from '../../../shared/ui/Form';
import { PasswordWrapper, StyledInputAuth, StyledPassword } from '../../../shared/ui/Input';
import { Paragraph } from '../../../shared/ui/Paragraph';
import ItemsContainerComponent from './items-container.component';
import StyledTitleComponent from './styled-title.component';

const LoginForm = ({ handleLogin, error, removeBorder }) => {
  const [type, setType] = useState(false);
  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id={'login'} />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id={'Login welcome mesage'} />
      </Paragraph>
      <ItemsContainerComponent>
        <Form
          onSubmit={handleLogin}
          autocomplete={'off'}
        >
          <StyledInputAuth
            onFocus={removeBorder}
            error={error}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
          />
          <PasswordWrapper>
            <StyledPassword
              onFocus={removeBorder}
              error={error}
              type={type ? 'text' : 'password'}
              name={'password'}
              placeholder={'Password'}
            />
            <FormIcon
              onClick={() => setType(!type)}
              src={type ? eyeopen : eyeclosed}
            />
          </PasswordWrapper>
          <ConfirmButton>
            <FormattedMessage id={'log in'} />
          </ConfirmButton>
        </Form>
        <Paragraph>
          <FormattedMessage id={'have not account'} />
          <Link to={'/register'}>
            <FormattedMessage id={'sign in'} />
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
