import React, {useState} from 'react'
import {IntlProvider, FormattedMessage} from 'react-intl'

import English from './en'
import Polish from './pl'
import Germany from './de'

const LanguageProvider = (props) => {

    const [locale, setLocale] = useState('en')
    const [language, setLanguage] = useState(English)

    function changeLanguage(language) {
        setLocale(language);
        switch (language) {
            case('en'):
                setLanguage(English)
                break;
            case('pl'):
                setLanguage(Polish)
                break;
            default:
                setLanguage(Germany)
        }
    }

    return (
        <IntlProvider locale={locale} messages={language}>
                <button onClick={() => changeLanguage('en')}> English</button>
                <button onClick={() => changeLanguage('pl')}> Polski</button>
            <div> {props.children}</div>
        </IntlProvider>)
}

export default LanguageProvider