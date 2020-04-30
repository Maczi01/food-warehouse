import React from 'react'
import SettingsCard from "../../components/SettingsCard";
import AppContext from "../../context/context";

const SettingsView = () => (
    <AppContext.Consumer>
        {(context) => (
            <>
                <SettingsCard toggleViewMode={context.toggleTheme}/>
            </>
        )}
    </AppContext.Consumer>

)

export default SettingsView;


{/*<>*/
}
{/*        <SettingsCard/>*/
}
{/*        <h1>Widok ustawień</h1>*/
}
{/*        <h2>samouczek</h2>*/
}
{/*        <h2>zmiena języka</h2>*/
}
{/*        <h2>tryb ciemny</h2>*/
}
{/*        <h2>dodaj jednostki</h2>*/
}
{/*        <h2>dodaj kategorię</h2>*/
}
{/*        <h2>o programie...</h2>*/
}
{/*</>*/
}