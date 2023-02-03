import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { useAuth } from '../../shared/utills/auth';
import Footer from './components/footer.component';
import Navbar from './components/navbar.component';

const ViewWrapper = styled.div`
  width: 80vw;
  height: 600px;
  margin: 0 auto 70px auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

const DefaultLayout = ({ children }) => {
  const { auth } = useAuth();
  const signOut = () => auth.signOut();
  return (
    <>
      <Navbar signOut={signOut} />
      <ViewWrapper>{children}</ViewWrapper>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
