import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// TODO niedo końca jestem pewny, jaki sposób deklarowania własnych
//  elementów będzie lepszy - sx, styled (z mui/system) czy inline z sx
const styles = {
  error: {
    textAlign: 'right',
    alignItems: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginRight: '26px',
    fontSize: '16px',
  },
};
export const Error = ({ show, message, testid }) => {
  if (!show || !message || !message.length) {
    return null;
  }

  return (
    <Typography sx={styles.error} data-testid={testid}>
      <FormattedMessage id={message} />
    </Typography>
  );
};

Error.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  testid: PropTypes.string,
};

export default Error;
