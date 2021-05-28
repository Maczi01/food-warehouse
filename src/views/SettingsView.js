import React from 'react'
import SettingsCard from "../components/organisms/SettingsCard";
import AppContext from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";

const SettingsView = () => (
    <MainTemplate>
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
    </MainTemplate>
);

export default SettingsView;
