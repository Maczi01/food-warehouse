import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

export const useLanguage = () => {
  const { changeLanguage, language } = useContext(LanguageContext);
  return { changeLanguage, language };
};
export const LanguageContext = createContext(undefined);

const flattenMessages = (nestedMessages, prefix = '') => {
  if (nestedMessages === null) {
    return {};
  }

  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export const TranslationProvider = ({ children, languages, defaultLanguage }) => {
  const [language, setLanguage] = useState(
    languages.length ? languages.find((item) => item.locale === defaultLanguage) : defaultLanguage
  );
  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };
  const changeLanguage = (language) => {
    const newLanguage = languages.find((item) => item.locale === language) || defaultLanguage;
    if (newLanguage) {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage: handleLanguageChange, language }}>
      <IntlProvider locale={language.locale} messages={flattenMessages(language.lang)}>
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
