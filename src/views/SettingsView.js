import React, {useContext} from 'react'
import SettingsCard from "../components/organisms/SettingsCard";
import AppContext from "../context/context";
import MainTemplate from "../components/templates/MainTemplate";
import English from '../languages/en'
import Polish from '../languages/pl'

const SettingsView = () => {

    // const {foodList} = useContext(AppContext);

    return (
        <MainTemplate>
            <AppContext.Consumer>
                {(context) => (
                    <>
                        <SettingsCard
                            toggleViewMode={context.toggleTheme}
                            darkMode={context.darkMode}
                            // changeLanguage={context.changeLanguage}
                            language={Polish}
                            locale={"en"}
                            handleChange={context.handleChange}
                        />
                    </>
                )}
            </AppContext.Consumer>
        </MainTemplate>
    )
};

export default SettingsView;
