import English from '../assets/i18n/en.json';
import Polish from '../assets/i18n/pl.json';

export const PL_language = {
  lang: Polish,
  locale: 'pl',
};
export const EN_language = {
  lang: English,
  locale: 'en',
};

export const availableLanguages = [PL_language, EN_language];

export const defaultLanguage = EN_language.lang;
