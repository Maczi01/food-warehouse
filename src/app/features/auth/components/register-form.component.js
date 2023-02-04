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

const RegisterForm = ({ handleRegister, removeBorder, error }) => {
  const [type, setType] = useState(false);
  return (
    <>
      <StyledTitleComponent>
        <FormattedMessage id={'register'} />
      </StyledTitleComponent>
      <Paragraph>
        <FormattedMessage id={'sign up account'} />
      </Paragraph>
      <ItemsContainerComponent>
        <Form onSubmit={handleRegister} autocomplete={'off'}>
          <StyledInputAuth onFocus={removeBorder} error={error} type={'email'} name={'email'} placeholder={'Email'} />
          <PasswordWrapper>
            <StyledPassword
              onFocus={removeBorder}
              error={error}
              type={type ? 'text' : 'password'}
              name={'password'}
              placeholder={'Password'}
            />
            <FormIcon onClick={() => setType(!type)} src={type ? eyeclosed : eyeopen} />
          </PasswordWrapper>
          <ConfirmButton>
            <FormattedMessage id={'sign up'} />
          </ConfirmButton>
        </Form>
        <Paragraph>
          <FormattedMessage id={'have account'} />
          <Link to={'/login'}>
            <FormattedMessage id={'log in'} />
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
