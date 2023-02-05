import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const ErrorText = styled.p`
  text-align: right;
  align-items: center;
  color: red;
  font-weight: bold;
  margin-right: 20px;
`;

const Error = ({ show, message, testid }) => {
  if (!show || !message || !message.length) {
    return null;
  }

  return (
    <ErrorText data-testid={testid}>
      <FormattedMessage id={message} />
    </ErrorText>
  );
};

Error.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  testid: PropTypes.string,
};

export default Error;
