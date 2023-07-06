import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// const StyledLabel = styled.label`
//   background-color: ${({theme}) => theme.colors.blue};
//   color: ${({theme}) => theme.colors.white};
//   text-align: center;
//   justify-content: center;
//   transition: 0.2s ease-out all;
//   font-size: 18px;
//   height: 45px;
//   width: 300px;
//   margin: 6px;
//   display: flex;
//   text-decoration: none;
//   align-items: center;
//   border-radius: 10px;
//   @media (max-width: ${({theme}) => theme.mobile}) {
//     height: 50px;
//   }
// `;

export const Label = ({ name, id }) => {
  if (!id) {
    return null;
  }
  // TODO Zapytać Marcina, czy zamiast labelki może być zwykły box
  return (
    <Box
      as="label"
      sx={{
        color: 'primary.contrastText',
        backgroundColor: 'primary.main',
        textAlign: 'center',
        justifyContent: 'center',
        transition: '0.2s ease-out all',
        fontSize: '18px',
        height: '45px',
        width: '300px',
        margin: '6px',
        display: 'flex',
        textDecoration: 'none',
        alignItems: 'center',
        borderRadius: '10px',
      }}
      htmlFor={name}
    >
      <FormattedMessage id={id} />
    </Box>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
};
