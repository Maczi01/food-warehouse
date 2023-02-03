import React from 'react';

import { useAuth } from '../../../shared/utills/Auth';
import SettingsCardComponent from '../components/settings-card.component';

const SettingsViewComponent = () => {
  const { auth } = useAuth();
  const currentMail = auth.currentUser.email;
  const signOut = () => auth.signOut();

  return <SettingsCardComponent
    signOut={signOut}
    currentMail={currentMail}
         />;
};

export default SettingsViewComponent;
