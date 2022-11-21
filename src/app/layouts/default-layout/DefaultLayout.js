import styled from "styled-components";
import Navbar from "./components/Navbar";
import React from "react";
import Footer from "./components/Footer";
import {useAuth} from '../../shared/utills/Auth';

const ViewWrapper = styled.div`
  width: 80vw;
  height: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;

  @media (max-width: ${({theme}) => theme.mobile}) {
    width: 100vw;
  }
`;

const DefaultLayout = ({children}) => {
    const {auth} = useAuth();
    const signOut = () => auth.signOut();
    return (
        <>
            <Navbar signOut={signOut}/>
            <ViewWrapper>{children}</ViewWrapper>
            <Footer/>
        </>
    );
};

export default DefaultLayout;
