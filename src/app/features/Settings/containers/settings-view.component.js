import { useAuth } from '../../../shared/utils/auth';
import SettingsCardComponent from '../components/settings-card.component';

const SettingsViewComponent = () => {
  const { auth } = useAuth();
  const currentMail = auth.currentUser.email;
  const signOut = () => auth.signOut();

  return <SettingsCardComponent signOut={signOut} currentMail={currentMail} />;
};

export default SettingsViewComponent;
