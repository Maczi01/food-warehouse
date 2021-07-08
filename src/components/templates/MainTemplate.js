import styled from "styled-components";
import Navbar from "../molecules/Navbar";
import React from "react";
import Footer from "../molecules/Footer";

const ViewWrapper = styled.div`
  width: 80vw;
  height: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100vw;
  }
`;

const MainTemplate = ({ children }) => (
  <>
    <Navbar />
    <ViewWrapper>{children}</ViewWrapper>
    <Footer />
  </>
);

export default MainTemplate;
