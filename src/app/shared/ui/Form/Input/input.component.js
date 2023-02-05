import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import eyeclosed from '../../../assets/icons/eyeclosed.svg';
import eyeopen from '../../../assets/icons/eyeopen.svg';
import { Error } from '../error.component';
import { Label } from '../label.component';
import { StyledInput } from './input.styled';
import FormIcon from './toggle-password.icon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FormItem = styled.div`
      width: 100%;
      display: flex;
         @media (max-width: ${({ theme }) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({ theme }) => theme.colors.darkblue});
      }
`;

const Input = ({ name, label, showError, error, type, placeholder, onFocus, intl, onChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { formatMessage } = intl;
  const [showInputValue, setShowInputValue] = useState(false);

  const handleChange = (event) => {
    helpers.setError(undefined);
    if (!Number.isNaN(event.target.valueAsNumber)) {
      helpers.setValue(event.target.valueAsNumber);
    } else {
      helpers.setValue(event.target.value);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const changeType = () => {
    setShowInputValue((value) => !value);
  };

  if (type === 'password') {
    return (
      <Wrapper>
        <FormItem>
          <Label name={name} id={label} />
          <InputWrapper>
            <Field
              name={name}
              type={showInputValue ? 'text' : 'password'}
              placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
              errors={showError}
              as={StyledInput}
              data-testid={name}
              onFocus={onFocus}
              onChange={handleChange}
            />
            <FormIcon onClick={changeType} src={showInputValue ? eyeopen : eyeclosed} />
          </InputWrapper>
        </FormItem>
        <Error testid={`error-${name}`} show={showError} message={error} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormItem>
        <Label name={name} id={label} />
        <Field
          name={name}
          type={type}
          placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
          errors={showError}
          as={StyledInput}
          data-testid={name}
          onFocus={onFocus}
          onChange={handleChange}
        />
      </FormItem>
      <Error testid={`error-${name}`} show={showError} message={error} />
    </Wrapper>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  intl: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  showError: false,
  placeholder: '',
};

export default injectIntl(Input);
