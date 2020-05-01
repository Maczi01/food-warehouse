import React, {useState} from 'react'
import {IntlProvider, FormattedMessage} from 'react-intl'

import English from './en'
import Polish from './pl'

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
        }
    }

    return (
        <IntlProvider locale={locale} messages={language}>
            <h1><FormattedMessage
                id="content"
            />
                <button onClick={() => changeLanguage('en')}> English</button>
                <button onClick={() => changeLanguage('pl')}> Polski</button>
            </h1>
            <div> {props.children}</div>
        </IntlProvider>)
}

export default LanguageProvider