import styled from "styled-components";
import Navbar from "../molecules/Navbar";
import React from "react";
import Footer from "../molecules/Footer";
import { auth } from "../../firebase/firebaseConfig";

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

const MainTemplate = ({ children }) => {
  const signOut = () => auth.signOut();
  return (
    <>
      <Navbar signOut={signOut}/>
      <ViewWrapper>{children}</ViewWrapper>
      <Footer />
    </>
  );
};

export default MainTemplate;
