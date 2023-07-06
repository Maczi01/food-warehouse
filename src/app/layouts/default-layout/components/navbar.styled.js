import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../../shared/assets/icons/logo.svg';

export const styles = {
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    height: '50px',
    underline: 'none',
    width: '230px',
    textDecoration: 'none',
    margin: '0px 10px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(253, 226, 79)',
    borderRadius: '5px',
  },
};

export const StyledLogoLink = styled(Link)`
  margin: 0 40px;
  display: block;
  justify-content: flex-start;
  width: 67px;
  height: 67px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: none;
`;

export const ListItem = ({ children, ...rest }) => {
  return (
    <Link sx={styles.navLink} {...rest} variant="button" color="primary" underline="hover" component={NavLink}>
      {children}
    </Link>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
};

export const HamburgerContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;
