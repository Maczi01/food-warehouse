import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

export const useLanguage = () => {
  const { changeLanguage, language } = useContext(LanguageContext);
  return { changeLanguage, language };
};
export const LanguageContext = createContext(undefined);

export const TranslationProvider = ({ children, languages, defaultLanguage }) => {
  const [language, setLanguage] = useState(languages.find((item) => item.locale === defaultLanguage));
  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };
  const changeLanguage = (language) => {
    switch (language) {
      case 'en': {
        const current = languages.find((item) => item.locale === 'en');
        if (current) {
          setLanguage(current);
        }
        break;
      }
      default: {
        const current = languages.find((item) => item.locale === defaultLanguage);
        if (current) {
          setLanguage(current);
        }
        break;
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage: handleLanguageChange, language }}>
      <IntlProvider
        locale={language.locale}
        messages={language.lang}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.node,
  languages: PropTypes.array,
  defaultLanguage: PropTypes.string,
};
