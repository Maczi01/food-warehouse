import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Error } from '../error.component';
import { Label } from '../label.component';
import StyledSelect from './select.styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
      width: 100%;
      display: flex;
         @media (max-width: ${({ theme }) => theme.mobile}) {
          flex-direction: column;
          border: 1px solid   ${({ theme }) => theme.colors.darkblue});
      }
`;

const Select = ({ name, label, showError, error, onBlur, options, onChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  const handleBlur = (event) => {
    helpers.setTouched(true);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event) => {
    helpers.setValue(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    helpers.setError(error);
  }, [error]);

  return (
    <Wrapper>
      <FormItem>
        <Label name={name} id={label} />
        <StyledSelect name={name} value={field.value} onChange={handleChange} onBlur={handleBlur} data-testid={name}>
          {options.map((option) => (
            <FormattedMessage id={option.translationKey} key={option.name}>
              {(text) => (
                <option key={option.name} value={option.name}>
                  {text}
                </option>
              )}
            </FormattedMessage>
          ))}
        </StyledSelect>
      </FormItem>
      <Error testid={`error-${name}`} show={showError} message={error} />
    </Wrapper>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, translationKey: PropTypes.string })),
};

Select.defaultProps = {
  showError: false,
};

export { Select };
