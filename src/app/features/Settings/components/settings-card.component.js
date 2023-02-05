import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import user from '../../../shared/assets/icons/user.svg';
import { Form } from '../../../shared/ui/Form';
import { Select } from '../../../shared/ui/Form/Select';
import {
  Button,
  Heading,
  OptionsItem,
  OptionsWrapper,
  Paragraph,
  SettingsWrapper,
  UserAvatarWrapper,
  UserCard,
  UserMailWrapper,
} from './settings-card.styled';

const languages = [
  {
    translationKey: 'GLOBAL.LANGUAGES.POLISH',
    name: 'pl',
  },
  {
    translationKey: 'GLOBAL.LANGUAGES.ENGLISH',
    name: 'en',
  },
];

const themes = [
  {
    translationKey: 'SETTINGS.BODY.THEME.DARK_MODE_OFF',
    name: 'off',
  },
  {
    translationKey: 'SETTINGS.BODY.THEME.DARK_MODE_ON',
    name: 'on',
  },
];

// todo: 1. move languages into more generic place

const SettingsCard = ({ email, language, darkMode, onLanguageChange, onThemeChange, onSignOut }) => {
  return (
    <>
      <Heading>
        <FormattedMessage id="SETTINGS.HEADER.TITLE" />
      </Heading>
      <SettingsWrapper>
        <UserCard>
          <UserAvatarWrapper src={user} alt="Avatar icon" />
          <UserMailWrapper>
            <Paragraph>
              <FormattedMessage id="SETTINGS.BODY.LOGGED_AS" values={{ email }} />
            </Paragraph>
            <Button onClick={onSignOut} data-testid="signOut">
              <FormattedMessage id="SETTINGS.BODY.LOGOUT" />
            </Button>
          </UserMailWrapper>
        </UserCard>

        <Formik
          enableReinitialize
          initialValues={{ language: language, theme: darkMode ? 'on' : 'off' }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={() => {}}
        >
          <Form autoComplete="off">
            <OptionsWrapper>
              <OptionsItem>
                <Select
                  name="language"
                  type="language"
                  label="SETTINGS.BODY.CHANGE_LANGUAGE"
                  onChange={onLanguageChange}
                  options={languages}
                />
              </OptionsItem>
              <OptionsItem>
                <Select
                  name="theme"
                  type="theme"
                  label="SETTINGS.BODY.THEME.DARK_MODE"
                  onChange={onThemeChange}
                  options={themes}
                />
              </OptionsItem>
            </OptionsWrapper>
          </Form>
        </Formik>
      </SettingsWrapper>
    </>
  );
};

SettingsCard.propTypes = {
  email: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};
export default SettingsCard;
