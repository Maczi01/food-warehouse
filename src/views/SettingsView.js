import React from "react";
import SettingsCard from "../components/organisms/SettingsCard";
import MainTemplate from "../components/templates/MainTemplate";
import {auth} from "../firebase/firebaseConfig";

const SettingsView = () => {
  const currentMail = auth.currentUser.email;
    const signOut = () => auth.signOut();

  return (
    <MainTemplate>
      <SettingsCard signOut={signOut} currentMail={currentMail}/>
    </MainTemplate>
  );
};

export default SettingsView;
