import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import {initReactI18next} from "react-i18next";


i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        langs: ['en', 'pl'],
        fallbackLng: 'en',
        load: "all",
        whitelist: ["pl", "en"],
        debug: false
    });

export default i18n;
