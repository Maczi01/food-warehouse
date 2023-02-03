import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  text-align: center;
  height: 70px;
  margin-top: 70px;
`;

const Footer = () => <Container />;

export default Footer;
