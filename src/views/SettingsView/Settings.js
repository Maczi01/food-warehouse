import React from 'react'
import SettingsCard from "../../components/SettingsCard";
import AppContext from "../../context/context";

const SettingsView = () => (
    <AppContext.Consumer>
        {(context) => (
            <>
                <SettingsCard
                    toggleViewMode={context.toggleTheme}
                    darkMode={context.darkMode}
                    changeLanguage={context.changeLanguage}
                    language={context.language}
                    locale={context.locale}
                    handleChange={context.handleChange}
                />
            </>
        )}
    </AppContext.Consumer>

)

export default SettingsView;
