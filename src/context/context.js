import React, {useEffect, useState} from 'react';
import {db} from "../firebase/firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import English from "../languages/en";
import Polish from "../languages/pl";
import {ThemeProvider} from "styled-components";
import {lightTheme, nightTheme} from '../theme/theme'
import {IntlProvider} from "react-intl";
import GlobalStyle from "../theme/GlobalStyle";

export const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [foodList, setFoodList] = useState([]);
    const [theme, setTheme] = useState(lightTheme);
    const [locale, setLocale] = useState('en');
    const [language, setLanguage] = useState(English);

    function changeLanguage(language) {
        setLocale(language);
        switch (language) {
            case('en'):
                setLanguage(English);
                break;
            default:
                setLanguage(Polish);
        }
    }

    const toggleTheme = (e) => {
        if (e.target.value === 'on') {
            setTheme(nightTheme);
        }
        if (e.target.value === 'off') {
            setTheme(lightTheme);
        }
    }

    const handleLanguageChange = e => {
        changeLanguage(e.target.value);
    };

    useEffect(() => {
        const unSubscribe = db.collection("foodList").onSnapshot(
            (snapshot) => {
                const foodListData = []
                snapshot.forEach(doc => foodListData.push({...doc.data(), id: doc.id}));
                setFoodList(foodListData)
            }
        );
        return unSubscribe;
    }, []);


    const increaseQuantity = (item) => {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) + 1});
        }
    };

    const decreaseQuantity = (item) => {
        if (item.currentQuantity > 0) {
            db.collection("foodList").doc(item.id).update({currentQuantity: parseInt(item.currentQuantity) - 1});
        }
    };

    const deleteItem = id => {
        const res = window.confirm('Do you want to delete this item?');
        db.collection("foodList").doc(id).delete()
    };

    const addItem = (newItem) => {
        newItem.id = uuidv4();
        db.collection("foodList").add(newItem);
    };

    const editItem = (item) => {
        try {
            db.collection("foodList").doc(item.id).update({...item})
        } catch (e) {
            window.alert("Nie udało się dodać!")
        }
    };

    const context = {
        foodList,
        locale,
        language,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        addItem,
        editItem,
        toggleTheme,
        handleLanguageChange
    }

    return (
        <AppContext.Provider value={context}>
            <IntlProvider locale={locale} messages={language}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle backgroundColor={lightTheme.backgroundColor}/>
                    {children}
                </ThemeProvider>
            </IntlProvider>
        </AppContext.Provider>
    )
}


export default AppProvider;