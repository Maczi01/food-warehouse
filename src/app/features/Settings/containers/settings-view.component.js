import { useTheme } from '../../../shared/theme/theme.provider';
import { useAuth } from '../../../shared/utils/auth';
import { useLanguage } from '../../../shared/utils/translation';
import SettingsCardComponent from '../components/settings-card.component';

const SettingsViewComponent = () => {
  const { auth } = useAuth();
  const { changeLanguage, language } = useLanguage();
  const { toggleTheme, darkMode } = useTheme();
  const signOut = () => auth.signOut();

  return (
    <SettingsCardComponent
      onSignOut={signOut}
      email={auth.currentUser.email}
      language={language.locale}
      onLanguageChange={changeLanguage}
      onThemeChange={toggleTheme}
      darkMode={darkMode}
    />
  );
};

export default SettingsViewComponent;
